"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [isAdded, setIsAdded] = useState(false);

    return (
        <div className="flex flex-col gap-6">

            {/* Title */}
            <div>
                <h1 className="font-outfit font-bold text-3xl md:text-4xl text-gray-900 leading-tight">
                    {product.name}
                </h1>
            </div>

            {/* Brand Header (Moved below title, Larger) */}
            <div className="flex items-center gap-[10px]">
                <span className="text-2xl font-bold text-red-600 uppercase tracking-wider">MARCA:</span>
                <div className="relative h-10 w-28">
                    <Image
                        src={product.brandLogo}
                        alt={product.brand}
                        fill
                        className="object-contain object-left"
                    />
                </div>
            </div>

            {/* SKU (Moved below Brand) */}
            <div>
                <p className="text-gray-500 font-medium text-sm">
                    {product.sku}
                </p>
            </div>

            {/* Badges */}
            {product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {product.badges.map(badge => (
                        <span key={badge} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                            {badge}
                        </span>
                    ))}
                </div>
            )}

            {/* Price section REMOVED per user request */}

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-4">
                <Button
                    onClick={() => setIsAdded(!isAdded)}
                    className="w-full h-12 text-base font-medium rounded-full flex items-center justify-center gap-2 shadow-none hover:shadow-lg transition-all"
                    style={{ backgroundColor: isAdded ? '#ECEC80' : '#ecec00', color: 'black' }}
                >
                    {isAdded && <Check className="w-4 h-4" />}
                    {isAdded ? 'Agregado' : 'Agregar'}
                </Button>

                {/* Cotizar button REMOVED per user request */}

                {/* Disclaimer text REMOVED per user request */}
            </div>
        </div>
    );
}
