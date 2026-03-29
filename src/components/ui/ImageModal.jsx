import { useEffect, useRef } from 'react';
import ImageWithFallback from './ImageWithFallback';

export default function ImageModal({ isOpen, onClose, imageUrl, title }) {
    const modalRef = useRef(null);

    // Cerrar con mousedown fuera del modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Cerrar con la tecla Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-chocolate/40 backdrop-blur-md animate-in fade-in duration-300 overscroll-behavior-contain"
        >
            <div 
                ref={modalRef}
                className="relative max-w-2xl w-full bg-cream rounded-custom overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            >
                {/* Botón de cerrar */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-chocolate hover:bg-chocolate hover:text-white transition-colors shadow-sm"
                    aria-label="Cerrar vista previa"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* Imagen */}
                <div className="aspect-[4/3] w-full relative">
                    <ImageWithFallback 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Pie de foto */}
                <div className="p-6 bg-white border-t border-chocolate/5">
                    <h3 className="heading-sm text-chocolate">{title}</h3>
                </div>
            </div>
        </div>
    );
}
