/**
 * Convierte un enlace de Google Drive (compartir/ver) en un enlace directo de imagen.
 * Soporta formatos como:
 * - https://drive.google.com/file/d/ID/view?usp=sharing
 * - https://drive.google.com/open?id=ID
 */
export const getDirectDriveLink = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Si ya es un enlace directo no hacemos nada
    if (url.includes('drive.google.com/uc') || url.includes('lh3.googleusercontent.com')) {
        return url;
    }

    // Extraer ID de varios formatos (file/d/ID, open?id=ID, d/ID, etc)
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /\/d\/([a-zA-Z0-9_-]+)/,
        /\/file\/d\/([a-zA-Z0-9_-]+)\//
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            const fileId = match[1];
            const directLink = `https://lh3.googleusercontent.com/d/${fileId}`;
            return directLink;
        }
    }

    return url;
};
