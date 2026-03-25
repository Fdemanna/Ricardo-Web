import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = "", delay = 0, yOffset = 30 }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={`transition-opacity transition-transform duration-500 ease-out ${className}`}
            style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : `translateY(${yOffset > 15 ? 15 : yOffset}px)`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
