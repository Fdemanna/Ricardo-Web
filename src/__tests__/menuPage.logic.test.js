import { describe, it, expect } from 'vitest';

/**
 * We extract the pure logic from MenuPage's useMemo so we can test it in isolation.
 * This is exactly the algorithm that runs in production – no mocks needed.
 */
function buildMenuCategories(menuItems, rawCategories) {
    const activeItems = menuItems.filter(item => item.isAvailable);

    const grouped = activeItems.reduce((acc, item) => {
        const catName = item.category || 'Otros';
        const safeName = Object.keys(acc).find(k => k.toLowerCase() === catName.toLowerCase()) || catName;
        if (!acc[safeName]) {
            acc[safeName] = { id: safeName, name: safeName, items: [] };
        }
        acc[safeName].items.push(item);
        return acc;
    }, {});

    const catConfigMap = {};
    rawCategories.forEach(c => {
        catConfigMap[(c.name || '').trim().toLowerCase()] = c;
    });

    const finalCategories = Object.values(grouped).filter(cat => {
        const config = catConfigMap[cat.name.trim().toLowerCase()];
        if (config && config.isVisible === false) return false;
        
        // Sort items inside this category by 'order' property
        cat.items.sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : 999;
            const orderB = b.order !== undefined ? b.order : 999;
            return orderA - orderB;
        });

        return true;
    }).sort((a, b) => {
        const configA = catConfigMap[a.name.trim().toLowerCase()];
        const configB = catConfigMap[b.name.trim().toLowerCase()];
        const orderA = configA?.order !== undefined ? configA.order : 999;
        const orderB = configB?.order !== undefined ? configB.order : 999;
        if (orderA === orderB) return a.name.localeCompare(b.name);
        return orderA - orderB;
    });

    return finalCategories;
}

// ── Fixtures ──────────────────────────────────────────────────────
const item = (id, category, isAvailable = true, order = 999) => ({ id, category, name: `Item ${id}`, isAvailable, order });
const cat = (name, order, isVisible = true) => ({ id: name, name, order, isVisible });

describe('MenuPage – category grouping & sorting logic', () => {

    // Happy path
    it('groups items by category', () => {
        const items = [item('a', 'Gofres'), item('b', 'Gofres'), item('c', 'Cafés')];
        const result = buildMenuCategories(items, []);
        expect(result).toHaveLength(2);
        expect(result.find(c => c.name === 'Gofres').items).toHaveLength(2);
        expect(result.find(c => c.name === 'Cafés').items).toHaveLength(1);
    });

    it('filters out items where isAvailable is false', () => {
        const items = [item('a', 'Gofres', true), item('b', 'Gofres', false)];
        const result = buildMenuCategories(items, []);
        expect(result[0].items).toHaveLength(1);
        expect(result[0].items[0].id).toBe('a');
    });

    it('returns empty array if all items are unavailable', () => {
        const items = [item('a', 'Gofres', false)];
        const result = buildMenuCategories(items, []);
        expect(result).toHaveLength(0);
    });

    it('returns empty array if menu is empty', () => {
        expect(buildMenuCategories([], [])).toHaveLength(0);
    });

    // Case-insensitive grouping
    it('groups category names case-insensitively (no duplicates)', () => {
        const items = [item('a', 'gofres'), item('b', 'Gofres'), item('c', 'GOFRES')];
        const result = buildMenuCategories(items, []);
        expect(result).toHaveLength(1);
        expect(result[0].items).toHaveLength(3);
    });

    // Fallback for missing category
    it('assigns items without a category to "Otros"', () => {
        const items = [item('a', undefined), item('b', '')];
        const result = buildMenuCategories(items, []);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Otros');
        expect(result[0].items).toHaveLength(2);
    });

    // Visibility filtering
    it('hides a category that has isVisible === false in rawCategories', () => {
        const items = [item('a', 'Gofres'), item('b', 'Cafés')];
        const cats = [cat('Gofres', 0, false), cat('Cafés', 1, true)];
        const result = buildMenuCategories(items, cats);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Cafés');
    });

    it('shows a category that has isVisible === true', () => {
        const items = [item('a', 'Gofres')];
        const cats = [cat('Gofres', 0, true)];
        const result = buildMenuCategories(items, cats);
        expect(result).toHaveLength(1);
    });

    it('shows a category with no visibility config (not in rawCategories)', () => {
        const items = [item('a', 'Gofres')];
        const result = buildMenuCategories(items, []);
        expect(result).toHaveLength(1);
    });

    // Ordering
    it('sorts categories by their `order` field', () => {
        const items = [item('a', 'Bebidas'), item('b', 'Gofres'), item('c', 'Cafés')];
        const cats = [cat('Bebidas', 2), cat('Gofres', 0), cat('Cafés', 1)];
        const result = buildMenuCategories(items, cats);
        expect(result.map(c => c.name)).toEqual(['Gofres', 'Cafés', 'Bebidas']);
    });

    it('places categories without `order` at the end (order=999 fallback)', () => {
        const items = [item('a', 'Desconocido'), item('b', 'Gofres')];
        const cats = [cat('Gofres', 0)]; // 'Desconocido' not in cats => order=999
        const result = buildMenuCategories(items, cats);
        expect(result[0].name).toBe('Gofres');
        expect(result[1].name).toBe('Desconocido');
    });

    it('sorts alphabetically when two categories have the same order value', () => {
        const items = [item('a', 'Zebra'), item('b', 'Apple')];
        const cats = [cat('Zebra', 5), cat('Apple', 5)];
        const result = buildMenuCategories(items, cats);
        expect(result[0].name).toBe('Apple');
        expect(result[1].name).toBe('Zebra');
    });

    // Config map case-insensitivity
    it('matches category names case-insensitively with rawCategories config', () => {
        const items = [item('a', 'GOFRES')];
        const cats = [{ id: 'g1', name: 'gofres', order: 0, isVisible: false }];
        // Despite different casing, the category should be hidden
        const result = buildMenuCategories(items, cats);
        expect(result).toHaveLength(0);
    });

    it('handles rawCategories with empty names gracefully', () => {
        const items = [item('a', 'Gofres')];
        const cats = [{ id: 'bad', name: '', order: 0 }, cat('Gofres', 1)];
        // Should not throw and should still find Gofres
        expect(() => buildMenuCategories(items, cats)).not.toThrow();
        const result = buildMenuCategories(items, cats);
        expect(result).toHaveLength(1);
    });

    // Sub-item sorting
    it('sorts sub-items inside each category by their own `order` field', () => {
        const items = [
            item('b', 'Cafés', true, 2), 
            item('c', 'Cafés', true, 999), 
            item('a', 'Cafés', true, 1)
        ];
        const cats = [cat('Cafés', 1)];
        const result = buildMenuCategories(items, cats);
        const cafeCat = result.find(c => c.name === 'Cafés');
        expect(cafeCat.items.map(i => i.id)).toEqual(['a', 'b', 'c']);
    });
});
