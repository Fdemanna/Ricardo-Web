import { describe, it, expect } from 'vitest';

/**
 * Extracted pure functions from MenuCategoryManager for unit testing.
 */

function sortCategories(rawCategories) {
    return [...rawCategories].sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : 999;
        const orderB = b.order !== undefined ? b.order : 999;
        if (orderA === orderB) return (a.name || '').localeCompare(b.name || '');
        return orderA - orderB;
    });
}

function applyDragReorder(categories, draggedIndex, dragOverIndex) {
    const newCategories = [...categories];
    const draggedItem = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(dragOverIndex, 0, draggedItem);
    // Returns the new order (index assignment would happen in Firebase calls)
    return newCategories.map((cat, i) => ({ ...cat, order: i }));
}

// ── sortCategories ────────────────────────────────────────────────
describe('sortCategories', () => {
    it('sorts by order ascending', () => {
        const cats = [{ id: 'c', name: 'C', order: 2 }, { id: 'a', name: 'A', order: 0 }, { id: 'b', name: 'B', order: 1 }];
        const sorted = sortCategories(cats);
        expect(sorted.map(c => c.name)).toEqual(['A', 'B', 'C']);
    });

    it('places items without order field at the end (order=999 fallback)', () => {
        const cats = [{ id: 'x', name: 'X' }, { id: 'a', name: 'A', order: 0 }];
        const sorted = sortCategories(cats);
        expect(sorted[0].name).toBe('A');
        expect(sorted[1].name).toBe('X');
    });

    it('sorts alphabetically when order values are equal', () => {
        const cats = [{ id: 'z', name: 'Zebra', order: 1 }, { id: 'a', name: 'Apple', order: 1 }];
        const sorted = sortCategories(cats);
        expect(sorted[0].name).toBe('Apple');
    });

    it('sorts alphabetically when all items lack the order field', () => {
        const cats = [{ id: 'b', name: 'Bebidas' }, { id: 'a', name: 'Aperitivos' }];
        const sorted = sortCategories(cats);
        expect(sorted[0].name).toBe('Aperitivos');
    });

    it('handles empty array', () => {
        expect(sortCategories([])).toEqual([]);
    });

    it('handles single item', () => {
        const cats = [{ id: 'a', name: 'Solo', order: 0 }];
        expect(sortCategories(cats)).toHaveLength(1);
    });

    it('does not mutate the original array', () => {
        const cats = [{ id: 'b', name: 'B', order: 1 }, { id: 'a', name: 'A', order: 0 }];
        sortCategories(cats);
        expect(cats[0].name).toBe('B'); // original unchanged
    });
});

// ── applyDragReorder ──────────────────────────────────────────────
describe('applyDragReorder (drag-and-drop reordering)', () => {
    const makeCats = (names) => names.map((name, i) => ({ id: name.toLowerCase(), name, order: i }));

    it('moves item from index 0 to index 2', () => {
        const cats = makeCats(['A', 'B', 'C']);
        const result = applyDragReorder(cats, 0, 2);
        expect(result.map(c => c.name)).toEqual(['B', 'C', 'A']);
    });

    it('moves item from index 2 to index 0', () => {
        const cats = makeCats(['A', 'B', 'C']);
        const result = applyDragReorder(cats, 2, 0);
        expect(result.map(c => c.name)).toEqual(['C', 'A', 'B']);
    });

    it('swaps two adjacent items', () => {
        const cats = makeCats(['A', 'B', 'C']);
        const result = applyDragReorder(cats, 1, 2);
        expect(result.map(c => c.name)).toEqual(['A', 'C', 'B']);
    });

    it('reassigns sequential order values after reorder', () => {
        const cats = makeCats(['A', 'B', 'C']);
        const result = applyDragReorder(cats, 0, 2);
        expect(result[0].order).toBe(0);
        expect(result[1].order).toBe(1);
        expect(result[2].order).toBe(2);
    });

    it('preserves total number of items', () => {
        const cats = makeCats(['A', 'B', 'C', 'D']);
        const result = applyDragReorder(cats, 0, 3);
        expect(result).toHaveLength(4);
    });

    it('does not mutate the original array', () => {
        const cats = makeCats(['A', 'B', 'C']);
        applyDragReorder(cats, 0, 2);
        expect(cats[0].name).toBe('A'); // original unchanged
    });
});
