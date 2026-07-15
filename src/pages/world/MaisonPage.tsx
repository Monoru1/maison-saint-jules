import { MaisonHistory } from './MaisonHistory';
import { WorldChapterPage } from './WorldChapterPage';
import './maison-history.css';

export function MaisonPage() {
  return (
    <WorldChapterPage chapter="maison">
      <MaisonHistory />
    </WorldChapterPage>
  );
}
