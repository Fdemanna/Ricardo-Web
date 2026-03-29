import ScrollReveal from '../ui/ScrollReveal';

export default function ArtisanalQuality() {

    return (
        <section className="py-16 lg:py-24 bg-[#FFFBF2]">
            <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative">
                    <ScrollReveal>
                        <div className="aspect-square rounded-custom overflow-hidden relative z-10 shadow-2xl">
                            <div className="w-full h-full bg-center bg-cover transform transition-transform duration-700 hover:scale-110" style={{backgroundImage: 'url(/helado-quality.jpeg)'}}></div>
                        </div>
                    </ScrollReveal>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-glacier rounded-full z-0 opacity-50 blur-xl"></div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                    <ScrollReveal yOffset={10}>
                        <div className="flex items-center gap-2 text-chocolate-light mb-4">
                            <span className="material-symbols-outlined">star</span>
                            <span className="font-bold uppercase tracking-widest text-sm">Receta Propia</span>
                        </div>
                        <h2 className="heading-lg mb-6">Cremosos y llenos de sabor</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={100} yOffset={10}>
                        <p className="text-lg text-chocolate/80 mb-8 leading-relaxed font-light text-justify">
                            Desde nuestro obrador elaboramos helados cremosos y llenos de sabor, con recetas propias y una gran variedad de sabores clásicos y especiales. A cualquier hora del día, ya sea para un helado paseando por la Avenida Rei en Jaume o para una merienda tranquila en la terraza, te esperamos con un trato cercano y un ambiente familiar.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={200} yOffset={5}>
                        <a href="https://www.instagram.com/ricardogelats/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block px-8 py-3 rounded-custom font-bold shadow-lg transition active:scale-95 hover:scale-105">Síguenos en Instagram @ricardogelats</a>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
