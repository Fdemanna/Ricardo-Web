import FlavorCard from './FlavorCard';

export default function FlavorCategory({ category }) {
    return (
        <section id={category.id}>
            <div className="flex flex-col items-center mb-12 text-center">
                <h2 className="heading-md mb-2 capitalize">{category.name}</h2>
                <div className="h-1 w-20 bg-chocolate/20 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.items.map((item, idx) => (
                    <FlavorCard key={idx} title={item.title} desc={item.desc} img={item.img} tags={item.tags} />
                ))}
            </div>
        </section>
    );
}
