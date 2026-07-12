import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo';
import { worldChapters } from './world-data';

export function WorldHome() {
  const chapters = Object.entries(worldChapters).filter(
    ([key]) => key !== 'journal',
  );
  return (
    <>
      <Seo
        title="Maison Saint-Jules — Une demeure à traverser"
        description="Une demeure parisienne à traverser, du seuil à la nuit."
      />
      <main className="world-index">
        <header className="world-index-intro">
          <p>17, rue Saint-Jules · Paris</p>
          <h1>
            Une Maison
            <br />
            <em>à traverser.</em>
          </h1>
          <span>Faites un pas.</span>
        </header>
        <nav aria-label="Chapitres de la Maison" className="world-index-map">
          {chapters.map(([key, item], index) => (
            <Link key={key} to={`/${key}`} className="world-index-link">
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              <i>{item.line}</i>
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
