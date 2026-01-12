"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Product, getRelatedProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/soluciones/ProductCard";
import { ChevronRight } from "lucide-react";

interface RelatedProductsProps {
    relatedIds: string[];
}

export function RelatedProducts({ relatedIds }: RelatedProductsProps) {
    const products = getRelatedProducts(relatedIds);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (products.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100 relative group">
            <div className="container mx-auto px-4 lg:px-12 relative">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-outfit font-normal text-2xl md:text-3xl text-gray-900">
                        Puede que también te interese
                    </h2>

                    {/* Arrows for Mobile (Top Right) - Optional, keeping standard layout preferred */}
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Prev Arrow (Left Outside) */}
                    <button
                        onClick={scrollPrev}
                        className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all"
                        aria-label="Anterior"
                    >
                        <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>

                    {/* Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-6 py-4">
                            {products.map(product => (
                                <div key={product.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-6 h-full">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Arrow (Right Outside) */}
                    <button
                        onClick={scrollNext}
                        className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
