import { useState, useCallback } from 'react';

export function useMobileMenu(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);
    
    return { isOpen, toggleMenu, closeMenu };
}
