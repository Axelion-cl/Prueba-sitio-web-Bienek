"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/soluciones/ProductCard";

interface PromoGridProps {
    title: string;
    products: Product[];
}

export function PromoGrid({ title, products }: PromoGridProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter products by search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="my-12">
            {/* Section Header with Title and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="font-outfit font-semibold text-2xl md:text-3xl text-gray-900 border-l-4 border-[#ecec00] pl-4">
                    {title}
                </h2>

                {/* Compact Search Bar */}
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] focus:border-transparent text-sm transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>

            {/* Scrollable Product Grid Container - Max 1 row visible */}
            <div className="max-h-[546px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {filteredProducts.length === 0 && (
                <div className="py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No se encontraron productos.</p>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-2 text-[#ecec00] hover:underline font-medium text-sm"
                        >
                            Limpiar búsqueda
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
