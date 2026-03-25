import { useNavigate } from 'react-router-dom';
import { LOCATIONS_DATA } from '../../constants/locations';
import ScrollReveal from '../ui/ScrollReveal';

export default function LocationPreviews() {
    const navigate = useNavigate();

    return (
        <section className="pb-12 section-container grid md:grid-cols-2 gap-6">
            {LOCATIONS_DATA.map((loc, idx) => (
                <ScrollReveal key={loc.id} delay={idx * 100} className="h-full">
                <div onClick={() => navigate('/locations')} className="h-full group bg-[#FFFBF2] p-8 rounded-custom border border-chocolate/10 hover:border-chocolate/30 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-chocolate">storefront</span>
                            <span className="text-sm font-bold uppercase tracking-wider text-chocolate/60">{loc.district}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-chocolate mb-1">{loc.shop}</h3>
                        <p className="text-sm text-chocolate/70">Abierto hoy: {loc.shortHours}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-glacier flex items-center justify-center group-hover:bg-chocolate transition-colors">
                        <span className="material-symbols-outlined text-chocolate group-hover:text-cream">arrow_forward</span>
                    </div>
                </div>
                </ScrollReveal>
            ))}
        </section>
    );
}
