import { useState } from 'react';
import ImageModal from '../ui/ImageModal';

export default function MenuItemCard({ title, desc, price, tags = [], imageUrl }) {
    const [showPreview, setShowPreview] = useState(false);
    
    // Ensuring numeric string forces 2 decimals and uses European comma format (e.g. 2 -> 2,00)
    const formattedPrice = !isNaN(parseFloat(price)) ? parseFloat(price).toFixed(2).replace('.', ',') : price;

    return (
        <>
            <div className="flex flex-col py-3 group border-b border-chocolate/5 last:border-0">
                <div className="flex justify-between items-baseline gap-2 w-full">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg md:text-xl font-serif font-bold text-chocolate group-hover:text-chocolate-light transition-colors text-balance">
                            {title}
                        </h3>
                        {imageUrl && (
                            <button 
                                onClick={() => setShowPreview(true)}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-chocolate/5 text-chocolate/40 hover:bg-chocolate hover:text-white transition-colors duration-300 active:scale-95"
                                title="Ver foto"
                                aria-label={`Ver foto de ${title}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow border-b border-dotted border-chocolate/10 mx-2"></div>
                    <span className="text-base md:text-lg font-bold text-chocolate whitespace-nowrap tabular-nums">{formattedPrice} €</span>
                </div>
                {desc && <p className="text-chocolate/60 text-sm font-light mt-1.5 pr-8 leading-relaxed italic text-justify">{desc}</p>}
                {tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-[0.1em] bg-white border border-chocolate/5 px-2.5 py-1 rounded-full text-chocolate/70 font-semibold shadow-sm">{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            {imageUrl && (
                <ImageModal 
                    isOpen={showPreview} 
                    onClose={() => setShowPreview(false)} 
                    imageUrl={imageUrl} 
                    title={title} 
                />
            )}
        </>
    );
}
