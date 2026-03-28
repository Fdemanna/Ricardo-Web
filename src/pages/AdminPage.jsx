import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FlavorsTab from '../components/admin/tabs/FlavorsTab';
import MenuTab from '../components/admin/tabs/MenuTab';

export default function AdminPage() {
    const { user, loading: authLoading, login, logout } = useAuth();

    // --- Tabs State ---
    const [activeTab, setActiveTab] = useState('flavors'); // 'flavors' | 'menu'

    // --- Auth Login State ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError('Credenciales incorrectas o usuario no autorizado.');
        }
    };

    if (authLoading) return <div className="min-h-screen bg-cream flex items-center justify-center"><div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div></div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative">
                <div className="absolute top-6 left-6 flex flex-col sm:flex-row gap-4">
                    <Link to="/" className="flex items-center gap-2 text-chocolate/80 hover:text-chocolate font-bold transition-colors text-sm">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Volver a la web
                    </Link>
                    <Link to="/carta" className="flex items-center gap-2 text-chocolate/80 hover:text-chocolate font-bold transition-colors text-sm">
                        <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                        Ver Carta
                    </Link>
                </div>
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-custom shadow-xl w-full max-w-md border border-chocolate/5">
                    <h1 className="heading-md text-center mb-6">Panel Admin</h1>
                    {error && <p className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm font-medium">{error}</p>}
                    <input type="email" placeholder="Correo electrónico" className="w-full mb-3 rounded-md border-chocolate/20 py-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Contraseña" className="w-full mb-6 rounded-md border-chocolate/20 py-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full btn-primary py-3 rounded-custom font-bold">Ingresar</button>
                    <p className="mt-4 text-center text-xs text-chocolate/50">Solo acceso autorizado para Ricardo Gelats.</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pb-20">
            <header className="bg-chocolate text-cream py-6 px-8 shadow-md flex justify-between items-center sticky top-0 z-40">
                <h1 className="heading-sm text-cream flex items-center gap-2">
                    <span className="material-symbols-outlined">shield_person</span>
                    Admin Panel
                </h1>

                {/* Navigation Tabs */}
                <div className="hidden md:flex bg-cream/10 rounded-full p-1 border border-cream/20">
                    <button
                        onClick={() => setActiveTab('flavors')}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'flavors' ? 'bg-cream text-chocolate shadow-md' : 'text-cream hover:bg-cream/10'}`}
                    >
                        🍦 Helados
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'menu' ? 'bg-cream text-chocolate shadow-md' : 'text-cream hover:bg-cream/10'}`}
                    >
                        ☕ Carta (Menú)
                    </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link to="/" className="flex bg-cream/5 hover:bg-cream/15 px-3 py-2 rounded-full text-[10px] font-bold transition-colors items-center gap-2 border border-cream/20 whitespace-nowrap">
                        <span className="material-symbols-outlined text-[14px]">storefront</span>
                        <span className="hidden xs:inline">Web</span>
                    </Link>
                    <Link to="/carta" className="flex bg-cream/5 hover:bg-cream/15 px-3 py-2 rounded-full text-[10px] font-bold transition-colors items-center gap-2 border border-cream/20 whitespace-nowrap">
                        <span className="material-symbols-outlined text-[14px]">restaurant_menu</span>
                        <span className="hidden xs:inline">Carta</span>
                    </Link>
                    <span className="hidden lg:inline text-sm font-medium opacity-80 border-l border-cream/20 pl-4 ml-2">{user.email}</span>
                    <button onClick={logout} className="bg-cream/10 hover:bg-cream/20 px-3 py-2 rounded-full text-[10px] font-bold transition-colors">Salir</button>
                </div>
            </header>

            {/* Mobile Tabs Fallback */}
            <div className="md:hidden flex bg-chocolate/5 p-2">
                <button
                    onClick={() => setActiveTab('flavors')}
                    className={`flex-1 py-3 text-center font-bold text-sm transition-all ${activeTab === 'flavors' ? 'bg-white text-chocolate rounded-md shadow-sm border border-chocolate/10' : 'text-chocolate/60'}`}
                >
                    🍦 Helados
                </button>
                <button
                    onClick={() => setActiveTab('menu')}
                    className={`flex-1 py-3 text-center font-bold text-sm transition-all ${activeTab === 'menu' ? 'bg-white text-chocolate rounded-md shadow-sm border border-chocolate/10' : 'text-chocolate/60'}`}
                >
                    ☕ Carta
                </button>
            </div>

            <main className="section-container mt-12">
                {activeTab === 'flavors' && <FlavorsTab />}
                {activeTab === 'menu' && <MenuTab />}
            </main>
        </div>
    );
}
