import HeroSection from '../components/home/HeroSection';
import LocationPreviews from '../components/home/LocationPreviews';
import ArtisanalQuality from '../components/home/ArtisanalQuality';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function HomePage() {
    useDocumentTitle('Ricardo Gelats · Helados Artesanales en Castellón');
    return (
        <div className="flex flex-col">
            <HeroSection />
            <LocationPreviews />
            <ArtisanalQuality />
        </div>
    );
}
