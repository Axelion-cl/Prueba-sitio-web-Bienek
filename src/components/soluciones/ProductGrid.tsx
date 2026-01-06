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

                {/* Search & Filter Bar - Modern centered design */}
                <div className="flex items-center justify-center gap-4" style={{ marginTop: '10px', marginBottom: '50px' }}>

                    {/* Search Input - Pill shape with shadow */}
                    <div
                        className="relative shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full"
                        style={{ width: '600px' }}
                    >
                        <input
                            type="text"
                            placeholder="Encuentra lo que estas buscando..."
                            className="w-full py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all text-gray-700 placeholder-gray-400"
                            style={{ backgroundColor: '#f0f4f8', paddingLeft: '52px', paddingRight: '20px' }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Search className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" style={{ left: '20px' }} />
                    </div>

                    {/* Divider line */}
                    <div className="h-12 w-px bg-gray-300" />

                    {/* Filtros Button */}
                    <div className="relative" ref={filterRef}>
                        <button
                            type="button"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-10 py-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-700 font-medium shadow-sm hover:shadow-md"
                        >
                            Filtros
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isFilterOpen && (
                            <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Filtrar por Marca</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {brands.map(brand => (
                                            <label
                                                key={brand}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                            >
                                                <input
                                                    type="radio"
                                                    name="brand"
                                                    checked={selectedBrand === brand}
                                                    onChange={() => setSelectedBrand(brand)}
                                                    className="w-4 h-4 accent-[#ecec00]"
                                                />
                                                <span className="text-sm text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {selectedBrand && (
                                        <button
                                            onClick={() => setSelectedBrand(null)}
                                            className="mt-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                        >
                                            <X className="w-3 h-3" />
                                            Limpiar filtro
                                        </button>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 p-3 bg-gray-50">
                                    <p className="text-xs text-gray-400 italic">Más filtros próximamente...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Clear all filters button */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Product Grid - 5 columns with modern cards */}
                <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-5 py-20 text-center text-gray-400">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">No se encontraron productos</p>
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
        </section>
    );
}
