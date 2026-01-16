"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { ProductGrid } from "@/components/soluciones/ProductGrid";
import { SidebarFilters } from "@/components/soluciones/SidebarFilters";
import { useSolutionsFilters } from "@/hooks/useSolutionsFilters";

interface SolutionsLayoutProps {
    initialProducts: Product[];
}

export function SolutionsLayout({ initialProducts }: SolutionsLayoutProps) {
    const {
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
    } = useSolutionsFilters(initialProducts);

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">

                {/* 1. Sidebar (Desktop & Mobile Stacked) */}
                <div className="lg:block">
                    {/* 1. Sidebar (Desktop & Mobile Stacked) */}
                    <div className="lg:block">
                        <SidebarFilters
                            availableBrands={availableBrands}
                            selectedBrands={selectedBrands}
                            onToggleBrand={toggleBrand}
                            availableFamilies={availableFamilies}
                            selectedFamilies={selectedFamilies}
                            onToggleFamily={toggleFamily}
                            onClearFilters={clearAllFilters}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>
                </div>

                {/* 2. Main Content */}
                <div className="flex-1">
                    {/* Local Search Bar */}
                    <div className="mb-8 flex justify-center">
                        <div
                            className="relative shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full w-full max-w-xl"
                        >
                            <input
                                type="text"
                                placeholder="Encuentra lo que estas buscando..."
                                className="w-full py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all text-gray-700 placeholder-gray-400"
                                style={{ backgroundColor: '#f0f4f8', paddingLeft: '52px', paddingRight: '20px' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" style={{ left: '20px' }} />
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="mb-6 flex justify-between items-end">
                        <p className="text-gray-500 text-sm">
                            Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> productos
                        </p>
                    </div>

                    {/* Grid */}
                    <ProductGrid
                        products={filteredProducts}
                        onClearSearch={() => setSearchQuery("")}
                    />

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-2">No se encontraron productos.</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-primary hover:underline font-medium"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
