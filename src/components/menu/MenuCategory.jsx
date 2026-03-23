import MenuItemCard from './MenuItemCard';

export default function MenuCategory({ category }) {
    return (
        <section id={category.id}>
            <div className="flex items-center gap-6 mb-12">
                <h2 className="heading-md shrink-0 capitalize">{category.name}</h2>
                <div className="h-px bg-chocolate/20 w-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
                {category.items.map((item, idx) => (
                    <MenuItemCard key={idx} title={item.title} desc={item.desc} price={item.price} tags={item.tags} />
                ))}
            </div>
        </section>
    );
}
