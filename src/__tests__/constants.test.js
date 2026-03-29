import { describe, it, expect } from 'vitest';
import { AVAILABLE_TAGS } from '../constants/allergens';
import { LOCATIONS_DATA } from '../constants/locations';

// ── Allergens ─────────────────────────────────────────────────────
describe('AVAILABLE_TAGS (allergens & dietary labels)', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(AVAILABLE_TAGS)).toBe(true);
        expect(AVAILABLE_TAGS.length).toBeGreaterThan(0);
    });

    it('contains only strings', () => {
        AVAILABLE_TAGS.forEach(tag => expect(typeof tag).toBe('string'));
    });

    it('contains no empty strings', () => {
        AVAILABLE_TAGS.forEach(tag => expect(tag.trim().length).toBeGreaterThan(0));
    });

    it('contains no duplicate tags', () => {
        const unique = new Set(AVAILABLE_TAGS);
        expect(unique.size).toBe(AVAILABLE_TAGS.length);
    });

    it('includes the mandatory EU-regulated allergens', () => {
        const required = ['Gluten', 'Sin Lactosa', 'Vegano'];
        required.forEach(r => {
            expect(AVAILABLE_TAGS).toContain(r);
        });
    });
});

// ── Locations ─────────────────────────────────────────────────────
describe('LOCATIONS_DATA', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(LOCATIONS_DATA)).toBe(true);
        expect(LOCATIONS_DATA.length).toBeGreaterThan(0);
    });

    it('every location has a unique id', () => {
        const ids = LOCATIONS_DATA.map(l => l.id);
        const unique = new Set(ids);
        expect(unique.size).toBe(ids.length);
    });

    it('every location has a name, address, mapLink, and img', () => {
        LOCATIONS_DATA.forEach(loc => {
            expect(loc.name).toBeTruthy();
            expect(loc.address).toBeTruthy();
            expect(loc.mapLink).toBeTruthy();
            expect(loc.img).toBeTruthy();
        });
    });

    it('every location has at least one schedule entry', () => {
        LOCATIONS_DATA.forEach(loc => {
            expect(Array.isArray(loc.schedules)).toBe(true);
            expect(loc.schedules.length).toBeGreaterThan(0);
        });
    });

    it('every schedule entry has `days` and `hours` fields', () => {
        LOCATIONS_DATA.forEach(loc => {
            loc.schedules.forEach(s => {
                expect(typeof s.days).toBe('string');
                expect(typeof s.hours).toBe('string');
            });
        });
    });

    it('mapLink fields are valid URLs', () => {
        LOCATIONS_DATA.forEach(loc => {
            expect(() => new URL(loc.mapLink)).not.toThrow();
        });
    });

    it('img paths start with /', () => {
        LOCATIONS_DATA.forEach(loc => {
            expect(loc.img.startsWith('/')).toBe(true);
        });
    });
});
