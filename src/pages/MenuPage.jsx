import { useMemo } from 'react';
import MenuCategory from '../components/menu/MenuCategory';
import { useFirebaseCollection } from '../hooks/useFirebaseCollection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHeader from '../components/layout/PageHeader';

export default function MenuPage() {
    useDocumentTitle('Carta y Cafetería · Ricardo Gelats');
    const { data: menuItems, loading } = useFirebaseCollection('menu_items');

    const categories = useMemo(() => {
        const activeItems = menuItems.filter(item => item.isAvailable);
        
        const grouped = activeItems.reduce((acc, item) => {
            const cat = item.category || 'Otros';
            if (!acc[cat]) {
                acc[cat] = {
                    id: cat,
                    name: cat,
                    items: []
                };
            }
            acc[cat].items.push(item);
            return acc;
        }, {});

        return Object.values(grouped).sort((a,b) => a.name.localeCompare(b.name));
    }, [menuItems]);

    return (
        <div className="bg-cream min-h-screen">
            <PageHeader 
                overline="Especialidades" 
                title="Carta y Cafetería" 
                description="Descubre nuestra exquisita selección de postres, gofres belgas, crepes, cafés de especialidad y bebidas refrescantes. El complemento perfecto para cualquier momento del día."
            />

            <div className="section-container py-16 space-y-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20 text-chocolate/50 font-medium bg-white rounded-custom border border-chocolate/5 p-12 shadow-sm">
                        <span className="material-symbols-outlined text-5xl opacity-40 mb-4 block">coffee</span>
                        <p>Nuestra carta está en proceso de actualización.</p>
                        <p className="text-sm mt-2 opacity-70">Vuelve pronto para descubrir nuestras delicias.</p>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <MenuCategory key={cat.id} category={cat} />
                    ))
                )}
            </div>

            <footer className="max-w-3xl mx-auto text-center border-t border-chocolate/10 py-12 px-6">
                <p className="text-xs text-chocolate/60 leading-relaxed">
                    IVA incluido en todos los precios. Si usted padece alguna alergia o intolerancia alimentaria, por favor fíjese en las etiquetas de los productos o consulte a nuestro personal. Contamos con opciones adaptadas.
                </p>
            </footer>
        </div>
    );
}
