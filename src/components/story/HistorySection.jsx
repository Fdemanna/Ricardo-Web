export default function HistorySection() {
    return (
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 section-container">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-end">
                <div className="w-full lg:w-5/12 flex flex-col gap-6 lg:pb-12">
                    <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-glacier text-chocolate text-xs font-bold tracking-widest uppercase">Ricardo Gelats</span>
                    <h1 className="heading-xl leading-[0.9]">
                        Nuestra <span className="italic font-light block ml-4 text-chocolate-light">historia</span>
                    </h1>
                    <p className="text-chocolate-light text-lg font-light leading-relaxed max-w-md mt-4 border-l-2 border-chocolate pl-6">
                        Llevamos décadas endulzando Castellón con helados artesanales, horchata y meriendas en familia. Nacimos como una heladería de barrio en pleno centro.
                    </p>
                </div>
                <div className="w-full lg:w-7/12 relative group">
                    <div className="absolute -inset-4 bg-glacier rounded-custom -z-10 transform rotate-2 group-hover:rotate-1 transition-transform duration-700"></div>
                    <div className="relative h-[614px] min-h-[500px] rounded-custom overflow-hidden shadow-2xl">
                        <img loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlar6EfdjAg7bEucfdePeINWhRJSf7rZUqejUAt5suE43X9FIHojDEoWONn2Rp6DEOl4V79vcUI4RnU9WvpfP0-kgKOHJyoJZ_06S1Toyu7x2BMRJtPqtJGyJk4qfNfBjSrc9F69ih0vO6JNL-aw-GJPYYQ4Xmca2L2RSu6iSFWIGoLEIvg3yya2S2cVck8dmenKHBQTngpNXKHFZQI4MqZrsnXhFHB7Nx6w0FiJbZHrtFo2cyd5-sP8fBcH2SrcrU_JRS6LYm1-8" alt="Gelato"/>
                        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/60 to-transparent w-full text-white font-serif italic text-xl">
                            "Hoy somos un punto de encuentro para varias generaciones, desde quienes venían de pequeños a la heladería antigua hasta los que descubren ahora nuestros helados en la avenida Rei en Jaume."
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
