import { useMemo } from 'react';
import FlavorCategory from '../components/flavors/FlavorCategory';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFirebaseCollection } from '../hooks/useFirebaseCollection';
import PageHeader from '../components/layout/PageHeader';

export default function FlavorsPage() {
    useDocumentTitle('Nuestros Helados · Ricardo Gelats');
    const { data: flavors, loading } = useFirebaseCollection('flavors');

    const categories = useMemo(() => {
        const activeFlavors = flavors.filter(f => f.isAvailable);

        const grouped = activeFlavors.reduce((acc, flavor) => {
            const cat = flavor.category;
            if (!acc[cat]) {
                acc[cat] = {
                    id: cat,
                    name: cat,
                    items: []
                };
            }
            acc[cat].items.push(flavor);
            return acc;
        }, {});

        return Object.values(grouped);
    }, [flavors]);

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
