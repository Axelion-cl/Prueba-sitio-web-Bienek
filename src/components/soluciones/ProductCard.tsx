"use client";

import Image from "next/image";
import { Product } from "@/data/mockProducts";
import { ImageIcon } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            {/* Image Placeholder - Square with icon */}
            <div
                className="relative w-full flex items-center justify-center group-hover:opacity-90 transition-opacity"
                style={{ aspectRatio: '1 / 1', backgroundColor: '#e8eef3' }}
            >
                <div
                    className="w-1/2 h-1/2 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#a8c4d9' }}
                >
                    <ImageIcon className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-grow">
                {/* Product Title */}
                <h3
                    className="font-sans font-normal text-gray-800 text-sm leading-snug mb-2 line-clamp-4 min-h-[4.5rem]"
                    title={product.name}
                >
                    {product.name}
                </h3>

                {/* Brand Row */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">MARCA:</span>
                    <div className="relative h-4 w-12">
                        <Image
                            src={product.brandLogo}
                            alt={product.brand}
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-col gap-1.5">
                    <button
                        type="button"
                        className="w-full text-black font-semibold text-sm py-2 rounded-md hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#ecec00' }}
                    >
                        Agregar
                    </button>

                    <button
                        type="button"
                        className="w-full text-black font-semibold text-sm py-2 rounded-md hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#A7E0A0' }}
                    >
                        Mas Info
                    </button>
                </div>
            </div>
        </div>
    );
}
