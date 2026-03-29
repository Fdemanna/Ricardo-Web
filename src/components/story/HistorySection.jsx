import ScrollReveal from '../ui/ScrollReveal';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function HistorySection() {
    return (
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 section-container">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-end">
                <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:pb-12">
                    <ScrollReveal>
                        <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-glacier text-chocolate text-xs font-bold tracking-widest uppercase">Ricardo Gelats</span>
                        <h1 className="heading-xl leading-[0.9] [text-wrap:balance]">
                            Nuestra <span className="italic font-light block ml-4 text-chocolate-light">historia</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={100} yOffset={20}>
                        <div className="flex flex-col gap-6 text-chocolate-light text-lg font-light leading-relaxed border-l-2 border-chocolate/20 pl-6 mt-4 text-justify">
                            <p>
                                En Ricardo Gelats llevamos más de 70 años endulzando Castellón con helados artesanales, horchata y meriendas en familia. Nuestra historia comienza en 1950, cuando se abre la horchatería original.
                            </p>
                            <p>
                                Mucho antes de ese local, la familia ya llevaba alrededor de cuatro décadas elaborando horchata y sirviéndola en carritos, de modo que la tradición horchatera se remonta a principios del siglo XX.
                            </p>
                            <p className="text-chocolate font-medium italic">
                                Hoy somos un punto de encuentro para varias generaciones.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
                <div className="w-full lg:w-1/2 relative group">
                    <ScrollReveal delay={200} xOffset={30}>
                        <div className="absolute -inset-4 bg-glacier rounded-custom -z-10 transform rotate-2 group-hover:rotate-1 transition-transform duration-700"></div>
                        <div className="relative h-[500px] lg:h-[600px] rounded-custom overflow-hidden shadow-2xl">
                            <ImageWithFallback 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlar6EfdjAg7bEucfdePeINWhRJSf7rZUqejUAt5suE43X9FIHojDEoWONn2Rp6DEOl4V79vcUI4RnU9WvpfP0-kgKOHJyoJZ_06S1Toyu7x2BMRJtPqtJGyJk4qfNfBjSrc9F69ih0vO6JNL-aw-GJPYYQ4Xmca2L2RSu6iSFWIGoLEIvg3yya2S2cVck8dmenKHBQTngpNXKHFZQI4MqZrsnXhFHB7Nx6w0FiJbZHrtFo2cyd5-sP8fBcH2SrcrU_JRS6LYm1-8" 
                                alt="Tradición Ricardo Gelats"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/60 to-transparent w-full text-white font-serif italic text-xl">
                                "Con el paso de los años, aquella horchatería de barrio fue incorporando helados y granizados artesanos, hasta convertirse en la heladería clásica."
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
            
            <ScrollReveal delay={300} yOffset={20}>
                <div className="mt-16 text-chocolate/80 leading-loose font-light text-lg max-w-4xl text-justify">
                    <p>
                        A principios de los 2000, una nueva generación tomó el relevo del negocio en la céntrica Avenida Rei en Jaume, manteniendo la elaboración artesanal de horchata, helados y granizados y abriendo una etapa de crecimiento y modernización. Mantenemos el compromiso de ser un punto de encuentro para quienes vienen de siempre y quienes nos descubren ahora.
                    </p>
                </div>
            </ScrollReveal>
        </section>
    );
}

