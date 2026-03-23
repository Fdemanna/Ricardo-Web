import ImageWithFallback from '../ui/ImageWithFallback';

export default function LocationCard({ shop, name, address, schedules, img, mapLink }) {
    return (
        <div className="flex flex-col bg-white rounded-custom overflow-hidden shadow-lg border border-chocolate/5 group">
            <div className="h-64 bg-gray-200 relative overflow-hidden">
                <ImageWithFallback 
                    src={img} 
                    alt={`Local ${name}`} 
                    loading="lazy" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    fallbackIcon="store"
                />
                <div className="absolute top-4 right-4 bg-cream/90 px-4 py-1.5 rounded-full text-xs font-bold text-chocolate shadow-sm border border-chocolate/10">{name}</div>
            </div>
            <div className="p-8 flex flex-col gap-6 flex-1">
                <h3 className="heading-sm">{shop}</h3>
                <div className="flex items-start gap-2 text-chocolate/80">
                    <span className="material-symbols-outlined text-chocolate">location_on</span>
                    <p className="text-base font-medium">{address}</p>
                </div>
                <div className="border-t border-chocolate/10 pt-6 flex-1">
                    <h4 className="font-serif font-bold text-chocolate mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">schedule</span> Horario
                    </h4>
                    <ul className="space-y-2 text-sm text-chocolate/70">
                        {schedules.map((schedule, idx) => (
                            <li key={idx} className="flex justify-between border-b border-chocolate/5 pb-1 last:border-0">
                                <span>{schedule.days}</span> 
                                <span className="font-bold">{schedule.hours}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-glacier py-3.5 rounded-custom font-bold text-chocolate uppercase tracking-wide hover:opacity-90 transition-all duration-200 active:scale-95">
                    Cómo Llegar
                </a>
            </div>
        </div>
    );
}
