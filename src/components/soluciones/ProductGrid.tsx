"use client";

import { useState } from "react";
import { Product } from "@/data/mockProducts";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const [query, setQuery] = useState("");

    // Filter products locally (mock logic)
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                    <div className="relative w-full md:max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar en los productos buscados..."
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    <Button variant="outline" className="flex items-center gap-2 border-gray-200">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtros
                    </Button>
                </div>

                {/* Independent Scroll Area Container */}
                <div className="border border-gray-100 rounded-2xl bg-gray-50/50 p-6 h-[800px] overflow-y-auto custom-scrollbar">
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
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p>No se encontraron productos para "{query}"</p>
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
