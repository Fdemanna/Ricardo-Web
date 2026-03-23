import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();
    
    return (
        <section className="relative py-12 lg:py-20 section-container">
            <div className="bg-glacier rounded-[20px] overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-2 gap-0">
                    <div className="flex flex-col justify-center p-8 lg:p-16 order-2 lg:order-1">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-chocolate text-cream text-xs font-bold tracking-widest uppercase mb-6 w-fit">Helados artesanales</span>
                        <h2 className="heading-xl mb-6">
                            Helados artesanales en el corazón de Castellón
                        </h2>
                        <p className="text-lg lg:text-xl leading-relaxed mb-8 text-chocolate/80 font-light">
                            Ricardo Gelats es la heladería de toda la vida en la que generaciones de castellonenses disfrutan de helados artesanos, horchata, gofres y meriendas en familia.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                            <button onClick={() => navigate('/flavors')} className="btn-primary px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg transition-transform hover:scale-105 flex-1 text-center">
                                Nuestros Sabores
                            </button>
                            <button onClick={() => navigate('/menu')} className="btn-secondary px-6 py-3.5 text-sm sm:text-base font-bold transition-colors hover:bg-chocolate hover:text-cream flex-1 text-center">
                                Ver Menú
                            </button>
                            <button onClick={() => navigate('/locations')} className="btn-secondary px-6 py-3.5 text-sm sm:text-base font-bold transition-colors hover:bg-chocolate hover:text-cream w-full sm:w-auto flex-[2_2_100%] lg:flex-1 text-center">
                                Encuentra tu local
                            </button>
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
