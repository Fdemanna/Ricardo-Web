import ImageWithFallback from '../ui/ImageWithFallback';
import ScrollReveal from '../ui/ScrollReveal';

export default function MasterMakerSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="relative aspect-[3/4] rounded-custom overflow-hidden shadow-xl">
                            <ImageWithFallback loading="lazy" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY1-xBy20k7HFGXprGzd-epzm2gZ0nT5CTczkVPK-TCaEa9tKXdQHxCq5HZEdedNQ0-jCWGy82jZW_kKE73_prkq7vzbZxnnD5qYi6reOh1RlC52GABXj2G_kwMnJSXxI2O2S0W1SpJbWp7XRm9WaOS47afb6QfZmDGlH7BeVDaGmh178tcVFuhir5jBQns4RjAGBNjdbbttBbHHgLQMk1mUZs0d0tzpBL5R3bGZnqP9n0bLuqWzeT90lJ9LDDyloUquNSf6UhunQ" alt="Ricardo" fallbackIcon="icecream" />
                        </div>
                        <div className="flex flex-col gap-2 border-t border-chocolate/20 pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-chocolate-light">Valores</span>
                            <h3 className="text-2xl font-serif text-chocolate">La experiencia Ricardo Gelats</h3>
                            <p className="text-sm text-chocolate-light leading-relaxed">Nuestro obrador elabora helados cremosos, yogur helado, granizados y horchata con mimo, cuidando el sabor, la textura y la presentación.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <h2 className="heading-lg mb-10">Tradición y<br/><span className="italic font-light">cercanía</span></h2>
                        <div className="prose prose-lg text-chocolate-light/90 font-light leading-loose text-justify">
                            <p className="mb-6"><span className="drop-cap">A</span>postamos por una gran variedad de sabores clásicos y modernos, gofres hechos al momento y opciones para que cada visita sea una experiencia diferente, tanto si vienes a por un helado rápido como si te quedas en la terraza.</p>
                            <p className="mb-6">La nueva etapa mantiene viva la tradición en el corazón de Castellón, pero con un ambiente joven, música y una oferta pensada para el público de hoy.</p>
                            <p>Nuestro equipo se caracteriza por un trato cercano; nos gusta ayudarte a elegir tu sabor perfecto y sugerirte nuevas combinaciones para que siempre tengas una excusa para volver.</p>
                        </div>
                    </div>
                </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
