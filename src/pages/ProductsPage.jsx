import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export default function ProductsPage() {
    useDocumentTitle('Nuestros Productos · Ricardo Gelats');

    return (
        <div className="bg-cream min-h-screen pb-20 relative overflow-hidden">
            {/* Grain Texture Overlay */}
            <div className="grain-overlay" />

            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-glacier/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-[#F4AF25]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Hero Section */}
            <section className="px-4 py-8 md:px-20 lg:px-40 relative z-10">
                <ScrollReveal>
                    <div className="overflow-hidden rounded-custom shadow-2xl shadow-chocolate/5">
                        <div className="flex min-h-[520px] flex-col gap-6 items-center justify-center p-8 text-center relative group overflow-hidden">
                            <ImageWithFallback 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0qA7AKT6_gxgNZptLlhHe-38FjHRsthdSb5vJwIb8z3HOOreZ76SP8IssoPwmfx8bCTFakqOzmRQ1hnoIXR_HE1b8I8CYlCFgysHt7TqexQ6Aqnc-_9I0N7Yh96rIxv1csUkKaYs3IoXrc3oyO0cABHN6SZBeVVtK1tGU9OvYZzATnG9e4FRN6p9SELBQ0UhP3h0xRAnK-bWlAmnrMH0kD-xlvS9M20FmkxFgBsiy_pAv9_DIxjVFFpSEblZKnMg5HxISA-napJY"
                                alt="Nuestras Especialidades"
                                fetchPriority="high"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div 
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(rgba(62, 39, 35, 0.3), rgba(62, 39, 35, 0.6))` }}
                            ></div>
                            <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="max-w-[850px] flex flex-col gap-6 relative z-10">
                                <span className="text-cream/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 drop-shadow-sm">Tradición Heladera desde 1950</span>
                                <h1 className="text-cream text-5xl md:text-7xl font-black leading-tight font-serif [text-wrap:balance] drop-shadow-md">
                                    Nuestras <span className="italic font-light">Especialidades</span>
                                </h1>
                                <div className="h-px w-24 bg-cream/30 mx-auto" />
                                <p className="text-cream/90 text-lg md:text-2xl font-normal max-w-2xl mx-auto italic font-light leading-relaxed">
                                    El sabor auténtico de lo artesanal, elaborado con pasión y los ingredientes que marcaron nuestra historia.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Product Showcase (Editorial Grid) */}
            <section className="px-4 py-12 md:px-20 lg:px-40 relative z-10">
                <ScrollReveal delay={100}>
                    <div className="flex flex-col gap-4 mb-20 text-center md:text-left">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                             <div className="h-[1px] w-12 bg-chocolate/20"></div>
                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/40">Heritage Collection</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight font-serif text-chocolate [text-wrap:balance]">Pura maestría en cada bocado</h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Helados (Highlight Card) */}
                    <div className="md:col-span-8 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[450px]">
                        <ImageWithFallback 
                            src="/helado-producto.JPG"
                            alt="Helados Artesanos"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3 w-full">
                            <div className="flex items-center gap-3">
                                <span className="bg-[#F4AF25] text-chocolate text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">La Estrella</span>
                            </div>
                            <h3 className="text-cream text-4xl font-bold font-serif italic mb-2">Helados Artesanos</h3>
                            <p className="text-cream/80 text-xl max-w-lg font-light leading-relaxed">
                                Nuestra selección de sabores clásicos y especiales, elaborados a diario con ingredientes de proximidad.
                            </p>
                        </div>
                    </div>

                    {/* Gofres */}
                    <div className="md:col-span-4 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[450px]">
                        <ImageWithFallback 
                            src="/gofre.png"
                            alt="Gofres"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3">
                            <h3 className="text-cream text-3xl font-bold font-serif italic mb-1">Gofres</h3>
                            <p className="text-cream/80 text-base font-light leading-relaxed">
                                Recién hechos, crujientes por fuera y tiernos por dentro con tus toppings favoritos.
                            </p>
                        </div>
                    </div>

                    {/* Yogurt Helado */}
                    <div className="md:col-span-4 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[380px]">
                        <ImageWithFallback 
                            src="/yogurt-helado.JPG"
                            alt="Yogurt Helado"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3">
                            <h3 className="text-cream text-3xl font-bold font-serif italic mb-1">Yogurt Helado</h3>
                            <p className="text-cream/80 text-base font-light font-sans tracking-tight">
                                Natural, ligero y refrescante. Personalízalo con fruta fresca y toppings artesanos.
                            </p>
                        </div>
                    </div>

                    {/* Granizados */}
                    <div className="md:col-span-4 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[380px]">
                        <ImageWithFallback 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeeyzdJWUvBPrr0L7usyx_0dpVc9u8Ld6oCbNiugo2kpD4UBB32_rV_g9o8loNfk8JZnRRc3zpqJXrPJ2Brtk2yI8asJvCuU84sLOeSZ62WEwUFs01cI4xXDvnlctZe_Di5k7khiImPnonlapIav1UiC18EZyBZU2N77r8uKyRbSrjCIq0vF2-E8789msCEMueUM83jCFarFDwqp1pcLAioN8Ps3SmS1A4L0QHZokPw-tBLjAtQHT_3GDtle6bxnAG1F7wPFipA10"
                            alt="Granizados"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3">
                            <h3 className="text-cream text-3xl font-bold font-serif italic mb-1">Granizados</h3>
                            <p className="text-cream/80 text-base font-light font-sans tracking-tight">
                                Auténtica tradición refrescante con limones y chufa seleccionada.
                            </p>
                        </div>
                    </div>

                    {/* Creps */}
                    <div className="md:col-span-4 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[380px]">
                        <ImageWithFallback 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZhEYcqZa1ZtxKCWUX4MJJGWBZqRdnplEuJnu2ENj8FPh7TJIUcrsVaXZ1wOCIv4vuQCu85p2Uppg6cZI8s_epMKdNcjrtSw3oScqwgN2McPm1ltZ2-p2OqqPKbJILaYU4jV12rd7QJRH-aftOt_u8UGflxSTDi0uiDC8gAuonqaxtjAoWX2HA_MRLnk8_goUIT60qreWUmqjlYu0Ll80uatMgpf0XEGZLHJFaB5yQY9aYVD1Hkm4rn2K4yr6-UdLLyI4foV0Q4_c"
                            alt="Creps"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3">
                            <h3 className="text-cream text-3xl font-bold font-serif italic mb-1">Creps</h3>
                            <p className="text-cream/80 text-base font-light font-sans tracking-tight">
                                Delicadas y rellenas con chocolate, frutas frescas o dulce de leche.
                            </p>
                        </div>
                    </div>

                    {/* Batidos (Vertical Card) */}
                    <div className="md:col-span-6 group relative overflow-hidden rounded-custom shadow-xl shadow-chocolate/5 h-[550px]">
                        <ImageWithFallback 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ravHvj5TQtPzwcpEYopwfCKig7ehRNZPqflxzF4x0wmbn_DjAhyeXT6Ef6he23TMeTfdbBhp_tbeWXpHdQpb3xdTlTJW-TRE5Z87O_vD_iOxEnRgx8SSTsmzM6HGeEQppwpJBgKzxmpcSFRERhlBAYwAfjHIL4VOVVNRBrbsmaQTYdKzY7CkzlIOgxen7dga2LhQ4ldy12KWMvNravTOJlJTTao7TIWBZu46tLWCpGjkucwA2cMMI0vkpeG0dty2Z_-7dfGvI0A"
                            alt="Batidos"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div 
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(0deg, rgba(62, 39, 35, 0.9) 0%, rgba(62, 39, 35, 0) 60%)` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3">
                            <span className="bg-[#F4AF25] w-fit text-chocolate text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg mb-2 transform origin-left transition-transform duration-500 group-hover:scale-105">Refrescante</span>
                            <h3 className="text-cream text-4xl font-bold font-serif italic mb-1">Batidos</h3>
                            <p className="text-cream/80 text-lg font-light leading-relaxed text-justify">
                                Cremosos e intensos, elaborados al momento con tu helado favorito y leche fresca.
                            </p>
                        </div>
                    </div>

                    {/* Bubble Tea (Vertical Card) */}
                    <div className="md:col-span-6 group relative overflow-hidden rounded-custom shadow-2xl shadow-chocolate/5 h-[550px]">
                        <ImageWithFallback 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3PTbkVcbi9j86hpzi0g7Cmo6EmGH3GnEvGjCDOfX1u-fudxIT_Ms8l7D4-gvMVpPnjk-wagdNMVY9CKF51XArcM64BUanYbtMWlHokw7KiRzcp6Tec5YyyVszDZd1GxBk-8B69MZPFdsvN4jhNuaBmKzPUEOBaE6ppT-Px3u4OKQoaJbYl85sVVd_EcaBuxtW4Wb9Oks1rmk-2O_BH02egrWnYuLnDTLI1fpH62pwkQBl_FBkGQZMkasQgDw9oD3f9nKl4g26K08"
                            alt="Bubble Tea"
                            fetchPriority="high"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div 
                            className="absolute inset-0 bg-chocolate/20 transition-colors duration-500 group-hover:bg-chocolate/40"
                        ></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 pb-10">
                            <div className="glass-card w-full px-6 py-10 rounded-custom flex flex-col items-center gap-4 border-white/10 hover:border-white/20 transition duration-700 transform translate-y-4 group-hover:translate-y-0 relative">
                                <span className="absolute -top-3 bg-[#F4AF25] text-chocolate text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1 rounded-full shadow-lg">Premium</span>
                                <h3 className="text-cream text-4xl font-bold font-serif italic mt-2">Bubble Tea</h3>
                                <div className="h-px w-12 bg-cream/20" />
                                <p className="text-cream/90 text-sm md:text-base font-light leading-relaxed text-justify">
                                    Un toque moderno en nuestra tradición. Perlas de sabor explosivo en una base de té infusionado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-cream px-4 py-24 md:px-20 lg:px-40 relative z-10">
                <ScrollReveal delay={200} yOffset={30}>
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 text-center bg-white p-16 rounded-custom shadow-2xl shadow-chocolate/5 border border-chocolate/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-glacier/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
                        
                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-5xl text-[#F4AF25] mb-2 scale-110" data-icon="storefront">storefront</span>
                                <div className="h-1 w-12 bg-[#F4AF25]/30 rounded-full"></div>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black font-serif text-chocolate [text-wrap:balance]">
                                ¿Vienes a <span className="italic font-light">visitarnos</span>?
                            </h2>
                            <p className="text-chocolate/60 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic px-4 text-justify">
                                "La verdadera artesanalidad no se explica, se disfruta en cada detalle."
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full justify-center">
                            <button 
                                onClick={() => window.open('https://maps.google.com/?q=Ricardo+Gelats+Castellon', '_blank')}
                                className="flex min-w-[280px] cursor-pointer items-center justify-center rounded-full h-16 px-12 bg-chocolate text-cream text-xl font-bold transition hover:bg-chocolate-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-chocolate/20 active:scale-95"
                            >
                                <span className="truncate tracking-wide">Visítanos en Castellón</span>
                            </button>
                            <a 
                                href="https://www.instagram.com/ricardogelats/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex min-w-[280px] items-center justify-center rounded-full h-16 px-12 bg-chocolate text-cream text-xl font-bold transition hover:bg-chocolate-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-chocolate/20 active:scale-95 shadow-md"
                            >
                                <span className="truncate tracking-wide">Síguenos @ricardogelats</span>
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
