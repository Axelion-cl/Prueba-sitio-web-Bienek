import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/data/mockProducts';

export function useSolutionsFilters(products: Product[]) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    // Using Set for efficient lookup of selected brands and families
    const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
    const [selectedFamilies, setSelectedFamilies] = useState<Set<string>>(new Set());

    // Initialize from URL params
    useEffect(() => {
        const familyParam = searchParams.get('family');
        if (familyParam) {
            setSelectedFamilies(new Set([familyParam]));
        }
    }, [searchParams]);

    const availableBrands = useMemo(() => {
        const brands = new Set(products.map(p => p.brand));
        return Array.from(brands).sort();
    }, [products]);

    const availableFamilies = useMemo(() => {
        const families = new Set(products.flatMap(p => p.familyIds || []));
        return Array.from(families).sort();
    }, [products]);

    const toggleBrand = (brand: string) => {
        const newSelected = new Set(selectedBrands);
        if (newSelected.has(brand)) {
            newSelected.delete(brand);
        } else {
            newSelected.add(brand);
        }
        setSelectedBrands(newSelected);
    };

    const toggleFamily = (familyId: string) => {
        const newSelected = new Set(selectedFamilies);
        if (newSelected.has(familyId)) {
            newSelected.delete(familyId);
        } else {
            newSelected.add(familyId);
        }
        setSelectedFamilies(newSelected);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Text Filter (Name or SKU)
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const matchesName = product.name.toLowerCase().includes(q);
                const matchesSku = product.sku.toLowerCase().includes(q);
                if (!matchesName && !matchesSku) return false;
            }

            // 2. Brand Filter (Multiple checkboxes)
            if (selectedBrands.size > 0 && !selectedBrands.has(product.brand)) {
                return false;
            }

            // 3. Family Filter (Multiple checkboxes)
            // Check if product belongs to AT LEAST ONE of the selected families
            if (selectedFamilies.size > 0) {
                const productFamilies = product.familyIds || [];
                const hasMatch = productFamilies.some(id => selectedFamilies.has(id));
                if (!hasMatch) return false;
            }

            return true;
        });
    }, [products, searchQuery, selectedBrands, selectedFamilies]);

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedBrands(new Set());
        setSelectedFamilies(new Set());
    };

    const hasActiveFilters = searchQuery.length > 0 || selectedBrands.size > 0 || selectedFamilies.size > 0;

    return {
        searchQuery,
        setSearchQuery,
        selectedBrands,
        toggleBrand,
        availableBrands,
        selectedFamilies,
        toggleFamily,
        availableFamilies,
        filteredProducts,
        clearAllFilters,
        hasActiveFilters
    };
}
