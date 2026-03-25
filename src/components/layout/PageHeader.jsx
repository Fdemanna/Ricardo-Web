export default function PageHeader({ overline, title, description, className = "", titleClassName = "" }) {
    return (
        <header className={`pt-16 pb-12 lg:py-20 px-4 text-center ${className}`}>
            {overline && <span className="text-chocolate/70 font-medium tracking-widest text-xs uppercase mb-4 block">{overline}</span>}
            <h1 className={`heading-xl mb-6 ${titleClassName}`}>{title}</h1>
            {description && <p className="text-chocolate/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">{description}</p>}
        </header>
    );
}
