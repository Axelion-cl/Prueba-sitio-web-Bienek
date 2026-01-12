import { useState, useMemo } from 'react';
import { Product } from '@/data/mockProducts';

export function useSolutionsFilters(products: Product[]) {
    const [searchQuery, setSearchQuery] = useState("");
    // Using Set for efficient lookup of selected brands
    const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());

    const availableBrands = useMemo(() => {
        const brands = new Set(products.map(p => p.brand));
        return Array.from(brands).sort();
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

            return true;
        });
    }, [products, searchQuery, selectedBrands]);

    return {
        searchQuery,
        setSearchQuery,
        selectedBrands,
        toggleBrand,
        availableBrands,
        filteredProducts
    };
}
