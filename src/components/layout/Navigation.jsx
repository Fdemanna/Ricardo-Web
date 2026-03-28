import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMobileMenu } from '../../hooks/useMobileMenu';

const navLinks = [
    { name: 'Helados', path: '/flavors' },
    { name: 'Productos', path: '/productos' },
    { name: 'Historia', path: '/story' },
    { name: 'Locales', path: '/locations' },
    { name: 'Negocios', path: '/b2b' },
];

export default function Navigation() {
    const { isOpen, toggleMenu, closeMenu } = useMobileMenu(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleContact = () => {
        closeMenu();

        if (location.pathname === '/locations') {
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        navigate('/locations#contacto');
        setTimeout(() => {
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    };

    return (
        <header className="w-full px-6 py-4 lg:px-12 flex items-center justify-between sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-chocolate/5 select-none h-20 md:h-24 transition-[height,background-color]">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="Ricardo Gelats Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-sm" />
                <h1 className="text-xl font-bold tracking-[0.05em] text-chocolate font-serif hidden sm:block">Ricardo Gelats</h1>
            </Link>

            <nav className="hidden lg:flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative group py-2 ${location.pathname === link.path ? 'text-chocolate' : 'text-chocolate/60 hover:text-chocolate'
                            }`}
                    >
                        {link.name}
                        <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-chocolate transition-transform duration-300 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}></span>
                    </Link>
                ))}
                <button
                    onClick={handleContact}
                    className="ml-4 bg-chocolate text-cream px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm hover:shadow-md hover:bg-chocolate-light transition-[background-color,transform,shadow] hover:-translate-y-0.5"
                >
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
