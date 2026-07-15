import { useEffect, useRef, useState } from 'react';
import { responsiveImageProps } from '@/utils/responsive-image';
import { useSceneQuality } from './useSceneQuality';
import { createFullscreenProgram, createImageTexture } from './webgl';

type LivingMaterialMode = 'still-water' | 'fabric';

const materialFragmentShader = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_textureSize;
  uniform sampler2D u_scene;
  uniform float u_time;
  uniform float u_mode;

  float hash(vec2 p) {
    p = fract(p * vec2(443.31, 271.83));
    p += dot(p, p + 41.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
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
    float time = u_time * 0.001;
    vec2 uv = coverUv(v_uv);
    vec2 displaced = uv;

    if (u_mode < 0.5) {
      float waterZone = 1.0 - smoothstep(0.18, 0.48, v_uv.y);
      float localPulse = noise(vec2(v_uv.x * 3.2, floor(time * 0.11))) * 0.55 + 0.45;
      float rippleA = sin(v_uv.x * 31.0 + time * 0.62 + noise(v_uv * 4.0) * 2.8);
      float rippleB = sin(v_uv.y * 21.0 - time * 0.37 + v_uv.x * 7.0);
      displaced.x += rippleA * 0.0022 * waterZone * localPulse;
      displaced.y += rippleB * 0.0012 * waterZone * localPulse;
    } else {
      float fabricZone = smoothstep(0.56, 0.82, v_uv.x);
      float verticalEase = smoothstep(0.02, 0.24, v_uv.y) * smoothstep(0.98, 0.7, v_uv.y);
      float longBreath = sin(time * 0.23 + v_uv.y * 1.7);
      float irregularAir = noise(vec2(time * 0.045, v_uv.y * 2.1)) - 0.5;
      displaced.x += (longBreath * 0.0028 + irregularAir * 0.0022) * fabricZone * verticalEase;
      displaced.y += sin(time * 0.17 + v_uv.x * 4.0) * 0.0007 * fabricZone;
    }

    vec3 color = texture2D(u_scene, clamp(displaced, 0.002, 0.998)).rgb;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function LivingMaterial({
  src,
  alt,
  mode,
  sizes = '100vw',
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  mode: LivingMaterialMode;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  );
  const quality = useSceneQuality();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { rootMargin: '18% 0px', threshold: 0.01 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible || quality === 'essential') return undefined;
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: quality === 'high' ? 'high-performance' : 'default',
    });
    if (!gl) return undefined;

    let frame = 0;
    let lastFrame = 0;
    const textureSize = { width: 1600, height: 1200 };
    try {
      const { program, buffer } = createFullscreenProgram(
        gl,
        materialFragmentShader,
      );
      const texture = createImageTexture(gl, src, (width, height) => {
        textureSize.width = width;
        textureSize.height = height;
        canvas.dataset.ready = 'true';
      });
      gl.useProgram(program);
      const resolution = gl.getUniformLocation(program, 'u_resolution');
      const imageSize = gl.getUniformLocation(program, 'u_textureSize');
      const time = gl.getUniformLocation(program, 'u_time');
      const shaderMode = gl.getUniformLocation(program, 'u_mode');
      const dprCap = quality === 'high' ? 1.4 : 1.1;
      const frameInterval = quality === 'high' ? 1000 / 45 : 1000 / 24;

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
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(imageSize, textureSize.width, textureSize.height);
        gl.uniform1f(time, now);
        gl.uniform1f(shaderMode, mode === 'fabric' ? 1 : 0);
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
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', resume);
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        delete canvas.dataset.ready;
      };
    } catch {
      return undefined;
    }
  }, [mode, quality, src, visible]);

  return (
    <div
      ref={rootRef}
      className={`living-material ${className}`}
      data-material={mode}
      data-quality={quality}
    >
      <img
        {...responsiveImageProps(src, sizes)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
