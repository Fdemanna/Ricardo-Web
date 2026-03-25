import HistorySection from '../components/story/HistorySection';
import PhilosophySection from '../components/story/PhilosophySection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function StoryPage() {
    useDocumentTitle('Sobre Nosotros · Ricardo Gelats');
    return (
        <div className="w-full">
            <HistorySection />
            <PhilosophySection />
        </div>
    );
}
