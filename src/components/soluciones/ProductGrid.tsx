"use client";

import { Product } from "@/data/mockProducts";
import { ProductCard } from "./ProductCard";
import { Search, X } from "lucide-react";

interface ProductGridProps {
    products: Product[];
    onClearSearch?: () => void;
}

export function ProductGrid({ products, onClearSearch }: ProductGridProps) {
    return (
        <section className="bg-white">
            <div className="">
                {/* Product Grid - Scrollable Container */}
                <div className="max-h-[800px] overflow-y-auto p-4 custom-scrollbar" style={{ marginBottom: '20px' }}>
                    <div
                        className="grid gap-6"
                        style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
                    >
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-5 py-20 text-center text-gray-400">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No se encontraron productos</p>
                                {onClearSearch && (
                                    <button
                                        onClick={onClearSearch}
                                        className="mt-4 text-[#ecec00] hover:underline font-medium"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
