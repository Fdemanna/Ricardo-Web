export default function FlavorOfTheMonth() {

    return (
        <section className="py-16 lg:py-24 bg-[#FFFBF2]">
            <div className="section-container flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative">
                    <div className="aspect-square rounded-custom overflow-hidden relative z-10 shadow-2xl">
                        <div className="w-full h-full bg-center bg-cover transform transition-transform duration-700 hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG6H35QEYOKWv4r8wJBj09hcDs7YwU4aTK-EX2rqGNyFps_ghIUhM5703P1ClgT6xl57g4GIy7545UcUniMqAV2uVmJRQBk6Nslw9wrkchNkUYc-PEmBfNPVmtukTFKjSmAAzXHkzIDFeaW899nPJN_WEqEOWgELbbo0lfmIsG7pc6FcPe88eGUr3gZjhO3dK4AWanCD7FD36Dqic3EPtEt3x3Pxgl_QJtHqbKID3-seCTKBmeGovVukL-2IvrOTvgcaRkkoyPivo")'}}></div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-glacier rounded-full z-0 opacity-50 blur-xl"></div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 text-chocolate-light mb-4">
                        <span className="material-symbols-outlined">star</span>
                        <span className="font-bold uppercase tracking-widest text-sm">Receta Propia</span>
                    </div>
                    <h2 className="heading-lg mb-6">Cremosos y llenos de sabor</h2>
                    <p className="text-lg text-chocolate/80 mb-8 leading-relaxed font-light">
                        Desde nuestro obrador elaboramos helados cremosos y llenos de sabor, con recetas propias y una gran variedad de sabores clásicos y especiales. A cualquier hora del día, ya sea para un helado paseando por la Avenida Rei en Jaume o para una merienda tranquila en la terraza, te esperamos con un trato cercano y un ambiente familiar.
                    </p>
                    <a href="https://www.instagram.com/ricardogelats/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block px-8 py-3 rounded-custom font-bold shadow-lg transition-transform hover:scale-105">Síguenos en Instagram @ricardogelats</a>
                </div>
            </div>
        </section>
    );
}
