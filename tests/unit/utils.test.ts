import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
    it('should merge class names correctly', () => {
        expect(cn('w-full', 'h-full')).toBe('w-full h-full');
    });

    it('should handle conditional classes', () => {
        const isActive = true;
        expect(cn('base', isActive && 'active', !isActive && 'hidden')).toBe('base active');
    });

    it('should merge tailwind conflicts', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });
});
