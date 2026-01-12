"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/mockProducts";
import { ImageIcon, Check } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

import Link from "next/link";

export function ProductCard({ product }: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        setIsAdded(!isAdded);
        // TODO: Future cart functionality when user is logged in
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 group relative">
            <Link href={`/productos/${product.id}`} className="absolute inset-0 z-10" aria-label={`Ver detalles de ${product.name}`} />
            {/* Image Placeholder - Square with icon */}
            {/* Product Image */}
            <div className="relative w-full aspect-square bg-[#f8f9fa] group-hover:opacity-95 transition-opacity">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                />
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
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">MARCA:</span>
                    <div className="relative shrink-0" style={{ width: '96px', height: '28px' }}>
                        <Image
                            src={product.brandLogo}
                            alt={product.brand}
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto pt-4 flex flex-col relative z-20" style={{ gap: '10px' }}>
                    <button
                        type="button"
                        onClick={handleAddClick}
                        className={`w-full text-black font-normal text-base py-2.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${isAdded
                            ? 'shadow-inner scale-[0.98]'
                            : 'hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        style={{ backgroundColor: isAdded ? '#ECEC80' : '#ECEC00' }}
                    >
                        {isAdded && <Check className="w-4 h-4" />}
                        {isAdded ? 'Agregado' : 'Agregar'}
                    </button>

                    <Link
                        href={`/productos/${product.id}`}
                        className="w-full text-black font-normal text-base py-2.5 rounded-md shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center text-center"
                        style={{ backgroundColor: '#A7E0A0' }}
                    >
                        Mas Info
                    </Link>
                </div>
            </div>
        </div>
    );
}
