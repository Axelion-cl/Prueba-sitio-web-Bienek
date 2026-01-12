"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                    src={images[selectedImage]}
                    alt={`${productName} - Vista principal`}
                    fill
                    className="object-contain p-8 mix-blend-multiply"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                            "relative w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all",
                            selectedImage === idx
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-gray-200 hover:border-gray-300"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${productName} - Vista ${idx + 1}`}
                            fill
                            className="object-cover p-2"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
