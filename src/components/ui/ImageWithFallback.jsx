import { useState } from 'react';

export default function ImageWithFallback({ src, alt, className, fallbackIcon = 'broken_image', ...props }) {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`bg-chocolate/10 flex items-center justify-center ${className}`} {...props}>
                <span className="material-symbols-outlined text-chocolate/30 text-4xl">{fallbackIcon}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
}
