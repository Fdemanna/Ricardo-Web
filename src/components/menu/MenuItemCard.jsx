export default function MenuItemCard({ title, desc, price, tags = [] }) {
    // Ensuring numeric string forces 2 decimals and uses European comma format (e.g. 2 -> 2,00)
    const formattedPrice = !isNaN(parseFloat(price)) ? parseFloat(price).toFixed(2).replace('.', ',') : price;

    return (
        <div className="flex flex-col py-2 group">
            <div className="flex justify-between items-baseline gap-4 w-full">
                <h3 className="text-xl font-serif font-bold text-chocolate group-hover:italic transition-all">{title}</h3>
                <div className="flex-grow border-b-2 border-dotted border-chocolate/20 mx-2"></div>
                <span className="text-lg font-bold text-chocolate whitespace-nowrap tabular-nums">{formattedPrice} €</span>
            </div>
            {desc && <p className="text-chocolate/60 text-sm font-light mt-1 pr-12">{desc}</p>}
            {tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-glacier px-2 py-0.5 rounded-full text-chocolate font-bold">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
