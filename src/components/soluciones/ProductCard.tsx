"use client";

import Image from "next/image";
import { Product } from "@/data/mockProducts";
import { ImageIcon } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Image Placeholder - Square gray background with centered icon */}
            <div
                className="relative w-full flex items-center justify-center"
                style={{ backgroundColor: '#e8eef3', aspectRatio: '1 / 1' }}
            >
                <div
                    className="w-1/2 h-1/2 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: '#a8c4d9' }}
                >
                    <ImageIcon className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Product Title - Normal weight, not bold */}
                <h3 className="font-sans font-normal text-gray-900 text-base leading-snug mb-3 line-clamp-4 min-h-[5rem]" title={product.name}>
                    {product.name}
                </h3>

                {/* Brand Row */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">MARCA:</span>
                    <div className="relative h-5 w-16">
                        <Image
                            src={product.brandLogo}
                            alt={product.brand}
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </div>

                {/* Buttons - Using inline styles to guarantee colors */}
                <div className="mt-auto flex flex-col gap-2">
                    {/* Primary Button - Agregar (#ECEC00) */}
                    <button
                        type="button"
                        className="w-full text-black font-semibold text-base py-3 rounded-full transition-colors"
                        style={{ backgroundColor: '#ecec00' }}
                    >
                        Agregar
                    </button>

                    {/* Secondary Button - Mas Info (#A7E0A0) */}
                    <button
                        type="button"
                        className="w-full text-black font-semibold text-base py-3 rounded-full transition-colors"
                        style={{ backgroundColor: '#A7E0A0' }}
                    >
                        Mas Info
                    </button>
                </div>
            </div>
        </div>
    );
}
