import LocationCard from '../components/locations/LocationCard';
import { LOCATIONS_DATA } from '../constants/locations';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHeader from '../components/layout/PageHeader';

export default function LocationsPage() {
    useDocumentTitle('Nuestros Locales · Ricardo Gelats');
    return (
        <div className="bg-cream">
            <PageHeader 
                title="Dos heladerías en pleno Castellón" 
                description="Te atendemos en dos locales situados en una de las avenidas más emblemáticas de Castellón, para que siempre tengas una heladería Ricardo Gelats cerca."
            />

            <section className="section-container pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {LOCATIONS_DATA.map((loc) => (
                        <LocationCard 
                            key={loc.id} 
                            {...loc}
                        />
                    ))}
                </div>
            </section>

            <section id="contacto" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="material-symbols-outlined text-5xl text-glacier-dark mb-6 block">call</span>
                    <h2 className="heading-md mb-4">¿Necesitas algo?</h2>
                    <p className="text-chocolate/70 text-lg mb-10 max-w-lg mx-auto text-justify">
                        Para pedidos grandes, consultas sobre alergias o cualquier otra cosa, llámanos directamente y estaremos encantados de atenderte.
                    </p>
                    <a 
                        href="tel:+34964123456" 
                        className="inline-flex items-center gap-4 bg-chocolate text-cream px-10 py-5 rounded-custom font-bold text-xl shadow-xl hover:bg-chocolate-light transition-colors group"
                    >
                        <span className="material-symbols-outlined text-2xl group-hover:animate-bounce">call</span>
                        +34 964 12 34 56
                    </a>
                    <p className="mt-6 text-sm text-chocolate/50">También puedes visitarnos en cualquiera de nuestros locales</p>
                </div>
            </section>
        </div>
    );
}
