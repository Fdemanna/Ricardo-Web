import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMobileMenu } from '../../hooks/useMobileMenu';

export default function Navigation() {
    const { isOpen, toggleMenu, closeMenu } = useMobileMenu(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleContact = () => {
        closeMenu();
        if (location.pathname === '/locations') {
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/locations#contacto');
            setTimeout(() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }, 400);
        }
    };

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Nuestros Helados', path: '/flavors' },
        { name: 'Carta / Cafetería', path: '/menu' },
        { name: 'Sobre Nosotros', path: '/story' },
        { name: 'Nuestros Locales', path: '/locations' },
    ];

    return (
        <header className="w-full px-6 py-4 lg:px-12 flex items-center justify-between sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-chocolate/10 select-none">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
                <img src="/logo.png" alt="Ricardo Gelats Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-sm" />
                <h1 className="text-2xl font-bold tracking-tight text-chocolate font-serif hidden sm:block">Ricardo Gelato</h1>
            </Link>
            
            <nav className="hidden lg:flex gap-10 items-center">
                {navLinks.map((link) => (
                    <Link 
                        key={link.path}
                        to={link.path}
                        className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                            location.pathname === link.path ? 'text-chocolate font-bold border-b-2 border-chocolate' : 'text-chocolate/70 hover:text-chocolate'
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
                <button 
                    onClick={handleContact} 
                    className="btn-primary px-5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                    <span className="material-symbols-outlined text-sm">call</span>
                    Contáctanos
                </button>
            </nav>

            <div className="flex items-center gap-4 lg:hidden">
                <button 
                    className="text-chocolate flex items-center p-2 -mr-2 rounded-md hover:bg-chocolate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-chocolate/50" 
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                >
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">{isOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div id="mobile-menu" className="absolute top-full left-0 w-full bg-cream border-b border-chocolate/10 flex flex-col p-6 gap-4 lg:hidden shadow-xl animate-in fade-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path}
                            onClick={closeMenu}
                            className="text-lg font-serif font-bold text-chocolate"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button 
                        onClick={handleContact} 
                        className="btn-primary w-full py-3 font-bold text-base flex items-center justify-center gap-2 mt-2"
                    >
                        <span className="material-symbols-outlined text-sm">call</span>
                        Contáctanos
                    </button>
                </div>
            )}
        </header>
    );
}
