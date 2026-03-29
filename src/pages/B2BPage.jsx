import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHeader from '../components/layout/PageHeader';

export default function B2BPage() {
    useDocumentTitle('Para Negocios · Ricardo Gelats');

    return (
        <div className="bg-cream">
            <PageHeader 
                overline="Colaboraciones"
                title="Tu negocio merece los mejores helados"
                titleClassName="text-balance"
                description="Trabajamos con restaurantes, hoteles y empresas de catering que quieren ofrecer a sus clientes algo diferente. Helados artesanales elaborados en nuestro obrador, con la misma calidad de siempre y la flexibilidad que necesita tu negocio."
            />

            <section className="section-container pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-chocolate/5 hover:shadow-md transition-shadow">
                        <h3 className="heading-sm mb-4 text-balance">Restaurantes y bares</h3>
                        <p className="text-chocolate/70 text-justify">
                            Incorpora nuestros helados a tu carta como postre o complemento. Formato cómodo, entrega regular y variedad de sabores según temporada.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-chocolate/5 hover:shadow-md transition-shadow">
                        <h3 className="heading-sm mb-4 text-balance">Hoteles</h3>
                        <p className="text-chocolate/70 text-justify">
                            Desde el desayuno buffet hasta el servicio de habitaciones. Adaptamos el formato y el volumen a tus necesidades.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-custom shadow-sm border border-chocolate/5 hover:shadow-md transition-shadow">
                        <h3 className="heading-sm mb-4 text-balance">Eventos y catering</h3>
                        <p className="text-chocolate/70 text-justify">
                            Bodas, comuniones, eventos corporativos. Helado artesanal como protagonista o como detalle final que marca la diferencia.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contacto" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="material-symbols-outlined text-5xl text-glacier-dark mb-6 block">call</span>
                    <h2 className="heading-md mb-4 text-balance">¿Hablamos?</h2>
                    <p className="text-chocolate/70 text-lg mb-10 max-w-lg mx-auto">
                        Cuéntanos qué necesitas y encontramos juntos la mejor solución para tu negocio.
                    </p>
                    <a 
                        href="tel:+34964123456" 
                        className="inline-flex items-center gap-4 bg-chocolate text-cream px-10 py-5 rounded-custom font-bold text-xl shadow-xl hover:bg-chocolate-light transition-colors group"
                    >
                        <span className="material-symbols-outlined text-2xl group-hover:animate-bounce">call</span>
                        +34 964 12 34 56
                    </a>
                    <p className="mt-6 text-sm text-chocolate/50">Llámanos o pásate por cualquiera de nuestros locales. Estaremos encantados de atenderte.</p>
                </div>
            </section>
        </div>
    );
}
