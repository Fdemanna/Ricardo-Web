import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-chocolate text-cream py-16 rounded-t-[40px] mt-8">
            <div className="section-container">
                <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-cream/10 pb-12 text-center md:text-left">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/logo.png" alt="Ricardo Gelats Logo" className="h-16 md:h-24 w-auto object-contain brightness-0 invert opacity-90" />
                            <h2 className="text-2xl font-bold tracking-tight font-serif text-cream">Ricardo Gelats</h2>
                        </div>
                        <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
                            Ricardo Gelats es la heladería de toda la vida en la que generaciones de castellonenses disfrutan de helados artesanos, horchata, gofres y meriendas en familia.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-glacier">Explorar</h4>
                        <ul className="space-y-3 text-sm text-cream/80">
                            <li><Link to="/story" className="hover:text-glacier transition-colors">Sobre Nosotros</Link></li>
                            <li><Link to="/flavors" className="hover:text-glacier transition-colors">Nuestros Helados</Link></li>
                            <li><Link to="/productos" className="hover:text-glacier transition-colors">Nuestros Productos</Link></li>
                            <li><Link to="/locations" className="hover:text-glacier transition-colors">Nuestros Locales</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-glacier">Contacto</h4>
                        <ul className="space-y-3 text-sm text-cream/80">
                        
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <span className="material-symbols-outlined text-sm">call</span>
                                +34 964 12 34 56
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-glacier">Síguenos</h4>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-glacier hover:text-chocolate transition-all" href="https://www.instagram.com/ricardogelats/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <span className="font-bold text-xs">IG</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-glacier hover:text-chocolate transition-all" href="https://www.toogoodtogo.com/es/find/castellodelaplana/ricardogelats/meal/ricardogelats-21975293747402048" target="_blank" rel="noopener noreferrer" title="Too Good To Go">
                                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-xs text-cream/40">
                    <p>© {new Date().getFullYear()} Ricardo Gelats. Todos los derechos reservados.</p>
                    <p className="mt-2 text-[10px] tracking-widest uppercase opacity-40">Diseñada por Francisco De Manna</p>
                </div>
            </div>
        </footer>
    );
}
