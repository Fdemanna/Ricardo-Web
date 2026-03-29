import { describe, it, expect } from 'vitest';
import { getDirectDriveLink } from '../utils/imageUtils';

describe('getDirectDriveLink', () => {
    // ── Happy path ────────────────────────────────────────────────
    it('converts a standard /file/d/ID/view share link', () => {
        const url = 'https://drive.google.com/file/d/1hZkTeLmno_ABC123XYZ/view?usp=sharing';
        const result = getDirectDriveLink(url);
        expect(result).toBe('https://lh3.googleusercontent.com/d/1hZkTeLmno_ABC123XYZ');
    });

    it('converts a drive open?id= link', () => {
        const url = 'https://drive.google.com/open?id=1hZkTeLmno_ABC123XYZ';
        const result = getDirectDriveLink(url);
        expect(result).toBe('https://lh3.googleusercontent.com/d/1hZkTeLmno_ABC123XYZ');
    });

    it('converts a short /d/ID path', () => {
        const url = 'https://drive.google.com/d/1hZkTeLmno_ABC123XYZ';
        const result = getDirectDriveLink(url);
        expect(result).toBe('https://lh3.googleusercontent.com/d/1hZkTeLmno_ABC123XYZ');
    });

    // ── Already converted ─────────────────────────────────────────
    it('returns lh3.googleusercontent.com URLs unchanged', () => {
        const url = 'https://lh3.googleusercontent.com/d/1hZkTeLmno_ABC123XYZ';
        expect(getDirectDriveLink(url)).toBe(url);
    });

    it('returns drive.google.com/uc URLs unchanged', () => {
        const url = 'https://drive.google.com/uc?id=1hZkTeLmno_ABC123XYZ&export=view';
        expect(getDirectDriveLink(url)).toBe(url);
    });

    // ── Non-Drive URLs ────────────────────────────────────────────
    it('returns a non-drive URL unchanged', () => {
        const url = 'https://example.com/imagen.jpg';
        expect(getDirectDriveLink(url)).toBe(url);
    });

    it('returns a local /public path unchanged', () => {
        const url = '/local-108.jpg';
        expect(getDirectDriveLink(url)).toBe(url);
    });

    // ── Edge cases ────────────────────────────────────────────────
    it('returns null if the input is null', () => {
        expect(getDirectDriveLink(null)).toBeNull();
    });

    it('returns undefined if the input is undefined', () => {
        expect(getDirectDriveLink(undefined)).toBeUndefined();
    });

    it('returns the value unchanged if it is not a string', () => {
        expect(getDirectDriveLink(42)).toBe(42);
    });

    it('returns empty string unchanged', () => {
        expect(getDirectDriveLink('')).toBe('');
    });

    // ── Correctness of extracted file ID ─────────────────────────
    it('correctly extracts IDs that contain hyphens and underscores', () => {
        const url = 'https://drive.google.com/file/d/1-abc_XYZ-123/view';
        const result = getDirectDriveLink(url);
        expect(result).toBe('https://lh3.googleusercontent.com/d/1-abc_XYZ-123');
    });
});
