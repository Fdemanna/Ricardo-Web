import { useEffect } from 'react';

/**
 * Hook para establecer el título de la página dinámicamente.
 * Se restaura al desmontar el componente.
 */
export function useDocumentTitle(title) {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;
        return () => { document.title = prevTitle; };
    }, [title]);
}
