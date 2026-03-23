import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <span className="text-[120px] lg:text-[180px] font-serif font-black text-chocolate/10 leading-none select-none">404</span>
            <h1 className="heading-md -mt-6 mb-4">Página no encontrada</h1>
            <p className="text-chocolate/70 text-lg max-w-md mb-8">
                Parece que esta página se ha derretido. Vuelve al inicio para seguir disfrutando.
            </p>
            <button 
                onClick={() => navigate('/')} 
                className="btn-primary px-8 py-3.5 font-bold shadow-lg transition-transform hover:scale-105"
            >
                Volver al inicio
            </button>
        </div>
    );
}
