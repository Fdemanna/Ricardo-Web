import { useState, useMemo } from 'react';
import FlavorCard from '../components/flavors/FlavorCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFirebaseCollection } from '../hooks/useFirebaseCollection';
import PageHeader from '../components/layout/PageHeader';

export default function FlavorsPage() {
    useDocumentTitle('Nuestros Helados · Ricardo Gelats');
    const { data: flavors, loading } = useFirebaseCollection('flavors', null, null, [
        { field: 'isAvailable', operator: '==', value: true }
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const sortedFlavors = useMemo(() => {
        let filtered = flavors;
        if (searchTerm) {
            filtered = filtered.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }, [flavors, searchTerm]);

    return (
        <div className="bg-cream min-h-screen">
            <PageHeader
                overline="Carta"
                title="Nuestros helados artesanales"
                description="En nuestra carta encontrarás una cuidada selección de helados artesanales, elaborados con ingredientes de calidad y una amplia variedad de sabores para disfrutar en cualquier momento del día."
            />

            <div className="section-container py-16 min-h-[40vh]">
                <div className="mb-12 max-w-md mx-auto relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40 group-focus-within:text-chocolate transition-colors pointer-events-none">
                        search
                    </span>
                    <input 
                        type="text"
                        placeholder="Buscar sabor de helado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-chocolate/20 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-chocolate/20 focus-visible:border-chocolate shadow-sm hover:shadow-md transition-colors transition-shadow duration-300 text-chocolate font-medium"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            aria-label="Limpiar búsqueda"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate/40 hover:text-chocolate p-1 rounded-full transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-chocolate/20"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div>
                    </div>
                ) : sortedFlavors.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-custom border border-chocolate/5 shadow-sm max-w-2xl mx-auto">
                        <span className="material-symbols-outlined text-5xl text-chocolate/20 mb-4 block">
                            {searchTerm ? 'search_off' : 'icecream'}
                        </span>
                        <h3 className="text-chocolate font-bold text-xl mb-2">
                            {searchTerm ? 'No encontramos ningún sabor' : 'Próximamente más sabores'}
                        </h3>
                        <p className="text-chocolate/60">
                            {searchTerm ? 'Prueba buscando con otras palabras.' : 'Estamos preparando nuevas delicias para ti.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sortedFlavors.map((item, idx) => (
                            <FlavorCard 
                                key={item.id || idx} 
                                title={item.title} 
                                desc={item.desc} 
                                img={item.img} 
                                tags={item.tags} 
                                priority={idx < 4}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
