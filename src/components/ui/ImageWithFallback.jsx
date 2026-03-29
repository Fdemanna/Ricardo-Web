import { useState } from 'react';
import { getDirectDriveLink } from '../../utils/imageUtils';

export default function ImageWithFallback({ src, alt, className, fallbackIcon = 'broken_image', ...props }) {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`bg-chocolate/10 flex items-center justify-center ${className}`} {...props}>
                <span className="material-symbols-outlined text-chocolate/30 text-4xl">{fallbackIcon}</span>
            </div>
        );
    }

    const directSrc = getDirectDriveLink(src);

    return (
        <img
            src={directSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            referrerPolicy="no-referrer"
            {...props}
        />
    );
}
