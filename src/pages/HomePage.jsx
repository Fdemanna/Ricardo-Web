import HeroSection from '../components/home/HeroSection';
import LocationPreviews from '../components/home/LocationPreviews';
import FlavorOfTheMonth from '../components/home/FlavorOfTheMonth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function HomePage() {
    useDocumentTitle('Ricardo Gelats · Helados Artesanales en Castellón');
    return (
        <div className="flex flex-col">
            <HeroSection />
            <LocationPreviews />
            <FlavorOfTheMonth />
        </div>
    );
}
