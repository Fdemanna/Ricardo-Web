export default function FlavorCard({ title, desc, img, tags = [] }) {
    return (
        <div className="group flex flex-col bg-white rounded-custom overflow-hidden shadow-sm border border-chocolate/5 hover:scale-[1.03] transition-all duration-300">
            <div className="relative h-64 shrink-0 overflow-hidden bg-cream/50 relative">
                <img src={img} loading="lazy" alt={title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 right-4"><span className="bg-glacier/90 backdrop-blur text-[10px] font-bold px-3 py-1 rounded-full text-chocolate uppercase border border-chocolate/10">Casero</span></div>
            </div>
            <div className="p-6 bg-white flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-chocolate mb-3">{title}</h3>
                <p className="text-chocolate/70 text-sm leading-relaxed font-light flex-1">{desc}</p>
                {tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider bg-glacier px-2 py-0.5 rounded-full text-chocolate font-bold">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
