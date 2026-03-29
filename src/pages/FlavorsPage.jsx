import { useMemo } from 'react';
import FlavorCategory from '../components/flavors/FlavorCategory';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFirebaseCollection } from '../hooks/useFirebaseCollection';
import PageHeader from '../components/layout/PageHeader';

export default function FlavorsPage() {
    useDocumentTitle('Nuestros Helados · Ricardo Gelats');
    const { data: flavors, loading: flavorsLoading } = useFirebaseCollection('flavors');
    const { data: rawCategories, loading: catLoading } = useFirebaseCollection('categories', 'order', 'asc');

    const loading = flavorsLoading || catLoading;
    
    const categories = useMemo(() => {
        // Build category config map for ordering
        const catConfigMap = rawCategories.reduce((acc, c) => {
            acc[(c.name || '').trim().toLowerCase()] = c;
            return acc;
        }, {});

        const activeFlavors = flavors.filter(f => f.isAvailable);

        const grouped = activeFlavors.reduce((acc, flavor) => {
            const cat = flavor.category || 'Sin categoría';
            // Normalize category name for matching with config
            const normalizedCat = cat.trim().toLowerCase();
            
            if (!acc[normalizedCat]) {
                acc[normalizedCat] = {
                    id: normalizedCat,
                    name: cat,
                    items: []
                };
            }
            acc[normalizedCat].items.push(flavor);
            return acc;
        }, {});

        // Sort items inside each category by their order
        Object.values(grouped).forEach(catObj => {
            catObj.items.sort((a, b) => {
                const orderA = a.order !== undefined ? a.order : 999;
                const orderB = b.order !== undefined ? b.order : 999;
                return orderA - orderB;
            });
        });

        // Convert to array and sort the categories themselves
        return Object.values(grouped).sort((a, b) => {
            const configA = catConfigMap[a.id];
            const configB = catConfigMap[b.id];
            const orderA = configA?.order !== undefined ? configA.order : 999;
            const orderB = configB?.order !== undefined ? configB.order : 999;
            if (orderA === orderB) return a.name.localeCompare(b.name);
            return orderA - orderB;
        });
    }, [flavors, rawCategories]);

    return (
        <div className="bg-cream min-h-screen">
            <PageHeader
                overline="Carta"
                title="Nuestros helados artesanales"
                description="En nuestra carta encontrarás una cuidada selección de helados artesanales, elaborados con ingredientes de calidad y una amplia variedad de sabores para disfrutar en cualquier momento del día."
            />

            <div className="section-container py-16 space-y-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20 text-chocolate/50 font-medium">Próximamente más sabores…</div>
                ) : (
                    categories.map((cat) => (
                        <FlavorCategory key={cat.id} category={cat} />
                    ))
                )}
            </div>
        </div>
    );
}
