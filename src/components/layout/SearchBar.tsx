"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dummy data for simulation
const products = [
    { id: 1, name: "Paños de Limpieza Wypall X70", brand: "Wypall", brandLogo: "/assets/images/logos/Wypall.png", image: "/assets/images/solutions/industria.png", category: "Industrial" },
    { id: 2, name: "Limpiador Desinfectante Lysoform", brand: "Lysoform", brandLogo: "/assets/images/logos/Lysoform.png", image: "/assets/images/solutions/salud.png", category: "Salud" },
    { id: 3, name: "Papel Higiénico Elite Professional", brand: "Elite", brandLogo: "/assets/images/logos/Elite.png", image: "/assets/images/solutions/oficinas.png", category: "Institucional" },
    { id: 4, name: "Dispensador de Jabón Tork", brand: "Tork", brandLogo: "/assets/images/logos/Tork-Logo.png", image: "/assets/images/solutions/horeca.png", category: "HORECA" },
    { id: 5, name: "Cera Autobrillo Virginia", brand: "Virginia", brandLogo: "/assets/images/logos/Virginia.png", image: "/assets/images/solutions/jardines.png", category: "General" },
];

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full lg:w-1/3" ref={containerRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Encuentra lo que estás buscando..."
                    className="w-full bg-gray-100 text-black rounded-full py-3 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>

            {/* Dropdown Results */}
            {isOpen && query.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100">
                    {filtered.length > 0 ? (
                        <ul>
                            {filtered.map((product) => (
                                <li key={product.id} className="border-b border-gray-50 last:border-none">
                                    <Link
                                        href="#"
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Product Name */}
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                                                    {product.name}
                                                </span>
                                                <span className="text-xs text-gray-400">{product.category}</span>
                                            </div>
                                        </div>

                                        {/* Brand Logo */}
                                        <div className="relative w-8 h-8 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Image
                                                src={product.brandLogo}
                                                alt={product.brand}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No se encontraron productos.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
