import { useMemo, useEffect } from 'react';
import MenuCategory from '../components/menu/MenuCategory';
import { useFirebaseCollection } from '../hooks/useFirebaseCollection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHeader from '../components/layout/PageHeader';

export default function MenuPage() {
    useDocumentTitle('Carta Completa · Ricardo Gelats');

    // SEO: Evitar que la carta sea indexada por buscadores
    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => {
            document.head.removeChild(meta);
        };
    }, []);
    const { data: menuItems, loading: itemsLoading } = useFirebaseCollection('menu_items', null, null, [
        { field: 'isAvailable', operator: '==', value: true }
    ]);
    const { data: rawCategories, loading: catsLoading } = useFirebaseCollection('menu_categories', null);

    const categories = useMemo(() => {
        // Now items arrive already filtered and sorted by 'order' from Firebase (base level)
        // Group all items dynamically
        const grouped = menuItems.reduce((acc, item) => {
            const catName = item.category || 'Otros';
            // Use case-insensitive grouping to avoid duplicates
            const safeName = Object.keys(acc).find(k => k.toLowerCase() === catName.toLowerCase()) || catName;
            
            if (!acc[safeName]) {
                acc[safeName] = { id: safeName, name: safeName, items: [] };
            }
            acc[safeName].items.push(item);
            return acc;
        }, {});

        // Build a config map from database categories
        const catConfigMap = {};
        rawCategories.forEach(c => {
            catConfigMap[(c.name || '').trim().toLowerCase()] = c;
        });

        // Filter out explicitly hidden categories and sort by assigned order
        const finalCategories = Object.values(grouped).filter(cat => {
            const config = catConfigMap[cat.name.trim().toLowerCase()];
            if (config && config.isVisible === false) return false;

            // Sort items inside this category by 'order' property
            cat.items.sort((a, b) => {
                const orderA = a.order !== undefined ? a.order : 999;
                const orderB = b.order !== undefined ? b.order : 999;
                return orderA - orderB;
            });

            return true;
        }).sort((a, b) => {
            const configA = catConfigMap[a.name.trim().toLowerCase()];
            const configB = catConfigMap[b.name.trim().toLowerCase()];
            
            const orderA = configA?.order !== undefined ? configA.order : 999;
            const orderB = configB?.order !== undefined ? configB.order : 999;

            if (orderA === orderB) {
                return a.name.localeCompare(b.name);
            }
            return orderA - orderB;
        });

        return finalCategories;
    }, [menuItems, rawCategories]);

    return (
        <div className="bg-cream min-h-screen">
            <PageHeader 
                overline="Especialidades" 
                title="Carta" 
                description="Descubre nuestra exquisita selección de postres, gofres, crepes, cafés de especialidad y bebidas refrescantes. El complemento perfecto para cualquier momento del día."
            />

            <div className="section-container py-16 space-y-24 min-h-[40vh]">
                {itemsLoading || catsLoading ? (
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
