"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/services/products";

// Type for search results
interface SearchResult {
    id: string;
    name: string;
    brand: string;
    brandLogo: string;
    image: string;
    sectorId: string | null;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce the search query (300ms delay)
    const debouncedQuery = useDebounce(query, 300);

    // Fetch products when debounced query changes
    useEffect(() => {
        async function fetchResults() {
            if (debouncedQuery.trim().length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const data = await searchProducts(debouncedQuery, 8);
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchResults();
    }, [debouncedQuery]);

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
                {isLoading ? (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 animate-spin" />
                ) : (
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && query.length >= 2 && (
                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            Buscando...
                        </div>
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((product) => (
                                <li key={product.id} className="border-b border-gray-50 last:border-none">
                                    <Link
                                        href={`/productos/${product.id}`}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
                                        onClick={() => {
                                            setIsOpen(false);
                                            setQuery("");
                                        }}
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
                                                <span className="text-xs text-gray-400">{product.brand}</span>
                                            </div>
                                        </div>

                                        {/* Brand Logo */}
                                        {product.brandLogo && (
                                            <div className="relative w-8 h-8 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Image
                                                    src={product.brandLogo}
                                                    alt={product.brand}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
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
