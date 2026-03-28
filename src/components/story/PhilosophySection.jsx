import ImageWithFallback from '../ui/ImageWithFallback';
import ScrollReveal from '../ui/ScrollReveal';

export default function PhilosophySection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <div className="relative aspect-[3/4] rounded-custom overflow-hidden shadow-xl">
                                <ImageWithFallback 
                                    loading="lazy" 
                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
                                    src="/historia-letrero.jpg"
                                    alt="Artesanía Ricardo Gelats" 
                                    fallbackIcon="icecream" 
                                />
                            </div>
                            <div className="flex flex-col gap-2 border-t border-chocolate/20 pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-chocolate-light">El Obrador</span>
                                <h3 className="text-2xl font-serif text-chocolate">La experiencia Ricardo Gelats</h3>
                                <p className="text-sm text-chocolate-light leading-relaxed">
                                    Cuidamos el sabor, la textura y la presentación en cada detalle de nuestros helados y horchata.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="heading-lg mb-10">Tradición y<br /><span className="italic font-light text-chocolate-light">cercanía</span></h2>
                            <div className="prose prose-lg text-chocolate-light/90 font-light leading-relaxed text-justify">
                                <p className="mb-6">
                                    <span className="drop-cap">N</span>uestro obrador elabora helados cremosos, yogur helado, granizados y horchata con mimo. Apostamos por una gran variedad de sabores, desde los clásicos de siempre hasta propuestas más actuales, con gofres hechos al momento, crepes, batidos y otras opciones pensadas para que cada visita sea especial.
                                </p>
                                <p className="mb-6">
                                    Tanto si vienes a por un helado rápido como si prefieres tomarte tu tiempo, queremos que disfrutes de cada instante: paseando con tu cucurucho, sentándote en la terraza o compartiendo una merienda en buena compañía. Esta nueva etapa mantiene viva la tradición en el corazón de Castellón, combinando historia y modernidad.
                                </p>
                                <p className="mb-6">
                                    Contamos con dos locales en la avenida Rei en Jaume: uno con espacio interior y terraza, y otro pensado exclusivamente para disfrutar al aire libre, ambos con un ambiente familiar y acogedor.
                                </p>
                                <p>
                                    Nuestro equipo se caracteriza por un trato cercano y atento; nos encanta ayudarte a encontrar tu sabor perfecto y sugerirte nuevas combinaciones, para que siempre tengas un motivo para volver a Ricardo Gelats.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
