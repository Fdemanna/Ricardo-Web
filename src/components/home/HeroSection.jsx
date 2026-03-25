import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

export default function HeroSection() {
    const navigate = useNavigate();
    
    return (
        <section className="relative py-12 lg:py-20 section-container">
            <div className="bg-glacier rounded-[20px] overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-2 gap-0">
                    <div className="flex flex-col justify-center p-8 lg:p-16 order-2 lg:order-1">
                        <ScrollReveal yOffset={10}>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-chocolate text-cream text-xs font-bold tracking-widest uppercase mb-6 w-fit">Helados artesanales</span>
                            <h2 className="heading-xl mb-6">
                                Helados artesanales en el corazón de Castellón
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={100} yOffset={10}>
                            <p className="text-lg lg:text-xl leading-relaxed mb-8 text-chocolate/80 font-light">
                                Ricardo Gelats es la heladería de toda la vida en la que generaciones de castellonenses disfrutan de helados artesanos, horchata, gofres y meriendas en familia.
                            </p>
                        </ScrollReveal>
                        <div className="flex flex-col gap-6 mt-4 w-full sm:max-w-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ScrollReveal delay={200} yOffset={5}>
                                    <button onClick={() => navigate('/flavors')} className="w-full bg-chocolate text-cream border-2 border-chocolate px-6 py-4 rounded-custom text-base font-bold shadow-xl transition-all active:scale-95 hover:bg-transparent hover:text-chocolate">
                                        Nuestros Sabores
                                    </button>
                                </ScrollReveal>
                                <ScrollReveal delay={300} yOffset={5}>
                                    <button onClick={() => navigate('/menu')} className="w-full bg-white text-chocolate border-2 border-transparent px-6 py-4 rounded-custom text-base font-bold shadow-xl transition-all active:scale-95 hover:border-chocolate">
                                        Ver Menú
                                    </button>
                                </ScrollReveal>
                            </div>
                            <ScrollReveal delay={400} yOffset={5}>
                                <button onClick={() => navigate('/locations')} className="flex items-center justify-center sm:justify-start gap-2 text-chocolate/80 hover:text-chocolate font-bold text-sm uppercase tracking-widest transition-colors w-fit mx-auto sm:mx-0 group active:opacity-70">
                                    <span className="material-symbols-outlined text-lg group-hover:animate-bounce">location_on</span>
                                    Encuentra tu local
                                </button>
                            </ScrollReveal>
                        </div>
                    </div>
                    <div className="relative h-64 lg:h-auto min-h-[400px] order-1 lg:order-2 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{backgroundImage: 'url(/helado-home.png)'}}></div>
                        {/* Enhanced Vignette/Radial Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(62,39,35,0.4)_100%)]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
