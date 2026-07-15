import { useEffect, useRef, useState } from 'react';
import { useSceneQuality } from './useSceneQuality';
import { waterCurtainTiming } from './water-curtain-timing';
import { createFullscreenProgram, createImageTexture } from './webgl';

export type WaterCurtainPhase = 'idle' | 'closing' | 'opening';

const waterFragmentShader = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_textureSize;
  uniform sampler2D u_scene;
  uniform float u_time;
  uniform float u_progress;
  uniform float u_phase;
  uniform float u_hasTexture;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(17.7, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  vec2 coverUv(vec2 uv) {
    float screenAspect = u_resolution.x / u_resolution.y;
    float textureAspect = u_textureSize.x / u_textureSize.y;
    vec2 scale = vec2(1.0);
    if (screenAspect > textureAspect) scale.y = textureAspect / screenAspect;
    else scale.x = screenAspect / textureAspect;
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = v_uv;
    float time = u_time * 0.001;
    float lowFlow = fbm(vec2(uv.x * 3.4, uv.y * 1.25 - time * 0.34));
    float thinFlow = fbm(vec2(uv.x * 17.0 + lowFlow * 2.2, uv.y * 2.7 - time * 0.8));
    float rupture = fbm(vec2(uv.y * 4.1 - time * 0.08, uv.x * 2.3));
    float verticalMass = smoothstep(0.18, 0.88, lowFlow * 0.74 + thinFlow * 0.26);

    float curtain;
    if (u_phase < 0.5) {
      float front = mix(1.16, -0.14, u_progress);
      float brokenFront = front + (lowFlow - 0.5) * 0.19 + (thinFlow - 0.5) * 0.045;
      curtain = smoothstep(brokenFront - 0.055, brokenFront + 0.03, uv.y);
    } else {
      float opening = smoothstep(0.0, 1.0, u_progress) * 0.475;
      float organicCenter = 0.5 + (rupture - 0.5) * 0.045;
      float distanceToCenter = abs(uv.x - organicCenter);
      float tornEdge = opening + (lowFlow - 0.5) * 0.055 + (thinFlow - 0.5) * 0.018;
      curtain = smoothstep(tornEdge - 0.018, tornEdge + 0.035, distanceToCenter);
      curtain *= 0.78 + verticalMass * 0.22;
    }

    vec2 displacement = vec2(
      (lowFlow - 0.5) * 0.026 + (thinFlow - 0.5) * 0.008,
      (lowFlow - 0.5) * 0.009
    );
    vec2 sceneUv = clamp(coverUv(uv + displacement), 0.002, 0.998);
    vec3 scene = texture2D(u_scene, sceneUv).rgb;
    vec3 mineralTint = vec3(0.31, 0.36, 0.34);
    vec3 refracted = mix(mineralTint, scene, 0.68 * u_hasTexture + 0.12);
    float filament = pow(smoothstep(0.64, 0.96, thinFlow), 3.0);
    float softLight = pow(smoothstep(0.56, 0.9, lowFlow), 2.2);
    refracted += vec3(0.24, 0.29, 0.27) * filament * 0.34;
    refracted += vec3(0.12, 0.1, 0.07) * softLight * 0.18;
    refracted *= 0.78 + verticalMass * 0.22;

    float alpha = curtain * (0.88 + verticalMass * 0.1);
    alpha *= smoothstep(0.0, 0.035, uv.x) * smoothstep(0.0, 0.035, 1.0 - uv.x);
    gl_FragColor = vec4(refracted, alpha);
  }
`;

export function WaterCurtain({ phase }: { phase: WaterCurtainPhase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);
  const phaseStartedAt = useRef(0);
  const quality = useSceneQuality();
  const [failed, setFailed] = useState(false);
  const active = phase !== 'idle';

  useEffect(() => {
    phaseRef.current = phase;
    phaseStartedAt.current = performance.now();
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || quality === 'essential') return undefined;

    let cancelled = false;
    const scheduleFallback = () => {
      queueMicrotask(() => {
        if (!cancelled) setFailed(true);
      });
    };

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: quality === 'high' ? 'high-performance' : 'default',
      premultipliedAlpha: true,
    });
    if (!gl) {
      scheduleFallback();
      return () => {
        cancelled = true;
      };
    }

    let frame = 0;
    let lastFrame = 0;
    let textureReady = 0;
    const textureSize = { width: 1600, height: 1200 };

    try {
      const { program, buffer } = createFullscreenProgram(
        gl,
        waterFragmentShader,
      );
      const texture = createImageTexture(
        gl,
        '/images/suites/chambre-signature-bath-v4.webp',
        (width, height) => {
          textureSize.width = width;
          textureSize.height = height;
          textureReady = 1;
        },
      );
      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const resolution = gl.getUniformLocation(program, 'u_resolution');
      const imageSize = gl.getUniformLocation(program, 'u_textureSize');
      const time = gl.getUniformLocation(program, 'u_time');
      const progress = gl.getUniformLocation(program, 'u_progress');
      const shaderPhase = gl.getUniformLocation(program, 'u_phase');
      const hasTexture = gl.getUniformLocation(program, 'u_hasTexture');
      const dprCap = quality === 'high' ? 1.5 : 1.15;
      const frameInterval = quality === 'high' ? 1000 / 60 : 1000 / 30;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
        const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      const draw = (now: number) => {
        if (document.hidden) {
          frame = 0;
          return;
        }
        frame = window.requestAnimationFrame(draw);
        if (now - lastFrame < frameInterval) return;
        lastFrame = now;
        resize();

        const currentPhase = phaseRef.current;
        const duration =
          currentPhase === 'closing'
            ? waterCurtainTiming.closing
            : waterCurtainTiming.opening;
        const phaseProgress = Math.min(
          1,
          Math.max(0, (now - phaseStartedAt.current) / duration),
        );
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(imageSize, textureSize.width, textureSize.height);
        gl.uniform1f(time, now);
        gl.uniform1f(progress, phaseProgress);
        gl.uniform1f(shaderPhase, currentPhase === 'opening' ? 1 : 0);
        gl.uniform1f(hasTexture, textureReady);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const resume = () => {
        if (!document.hidden && !frame)
          frame = window.requestAnimationFrame(draw);
      };
      window.addEventListener('resize', resize, { passive: true });
      document.addEventListener('visibilitychange', resume);
      resize();
      frame = window.requestAnimationFrame(draw);

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', resume);
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    } catch {
      scheduleFallback();
      return () => {
        cancelled = true;
      };
    }
  }, [active, quality]);

  const fallback = quality === 'essential' || failed;
  return (
    <div
      className="water-curtain"
      data-active={active ? 'true' : 'false'}
      data-fallback={fallback ? 'true' : 'false'}
      data-phase={phase}
      data-quality={quality}
    >
      <canvas ref={canvasRef} className="water-curtain-canvas" />
      <div className="water-curtain-fallback" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="water-curtain-shadow" aria-hidden="true" />
    </div>
  );
}
