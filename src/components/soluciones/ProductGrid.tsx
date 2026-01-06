"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/data/mockProducts";
import { ProductCard } from "./ProductCard";
import { Search, ChevronDown, X } from "lucide-react";

interface ProductGridProps {
    products: Product[];
}

// Get unique brands from products
function getUniqueBrands(products: Product[]): string[] {
    const brands = new Set(products.map(p => p.brand));
    return Array.from(brands).sort();
}

export function ProductGrid({ products }: ProductGridProps) {
    const [query, setQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const brands = getUniqueBrands(products);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Real-time filtering
    const filteredProducts = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
        return matchesQuery && matchesBrand;
    });

    const clearFilters = () => {
        setQuery("");
        setSelectedBrand(null);
    };

    const hasActiveFilters = query !== "" || selectedBrand !== null;

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4">

                {/* Search & Filter Bar - Centered, compact design */}
                <div className="flex items-center justify-center gap-3 mb-8">

                    {/* Search Input - Matching provided design */}
                    <div className="relative" style={{ width: '400px' }}>
                        <input
                            placeholder="encuentra lo que estas buscando"
                            className="w-full py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ecec00]/50 transition-all border-0 text-gray-600 placeholder-gray-400"
                            style={{ backgroundColor: '#e8eef5' }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            type="button"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all border ${isFilterOpen || selectedBrand
                                ? 'bg-[#ecec00] text-black border-[#ecec00]'
                                : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                                }`}
                        >
                            <span className="font-medium">Filtros</span>
                            {selectedBrand && (
                                <span className="bg-black/10 px-2 py-0.5 rounded text-xs">1</span>
                            )}
                            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isFilterOpen && (
                            <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                                <div className="p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Filtrar por Marca</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {brands.map(brand => (
                                            <label
                                                key={brand}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                                            >
                                                <input
                                                    type="radio"
                                                    name="brand"
                                                    checked={selectedBrand === brand}
                                                    onChange={() => setSelectedBrand(brand)}
                                                    className="w-4 h-4 text-[#ecec00] accent-[#ecec00]"
                                                />
                                                <span className="text-sm text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Future filters placeholder */}
                                <div className="border-t border-gray-100 p-4">
                                    <p className="text-xs text-gray-400 italic">Más filtros próximamente...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Results count */}
                <div className="text-center text-sm text-gray-500 mb-6">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                    {selectedBrand && <span className="ml-1">en <strong>{selectedBrand}</strong></span>}
                </div>

                {/* Product Grid */}
                <div className="border border-gray-100 rounded-2xl bg-gray-50/50 p-6 min-h-[600px] max-h-[800px] overflow-y-auto custom-scrollbar">
                    {filteredProducts.length > 0 ? (
                        <div
                            className="grid gap-4 md:gap-6"
                            style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
                        >
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20">
                            <Search className="w-12 h-12 mb-4 opacity-50" />
                            <p className="text-lg">No se encontraron productos</p>
                            <p className="text-sm mt-1">Intenta con otros términos o filtros</p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-[#ecec00] hover:underline font-medium"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db; 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af; 
                }
            `}</style>
        </section>
    );
}
