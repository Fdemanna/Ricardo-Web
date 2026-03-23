import HistorySection from '../components/story/HistorySection';
import MasterMakerSection from '../components/story/MasterMakerSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function StoryPage() {
    useDocumentTitle('Sobre Nosotros · Ricardo Gelats');
    return (
        <div className="w-full">
            <HistorySection />
            <MasterMakerSection />
        </div>
    );
}
