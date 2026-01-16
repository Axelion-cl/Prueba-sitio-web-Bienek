"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { families } from "@/data/families";

// Using native input styled with Tailwind since shadcn Checkbox is not installed.

interface SidebarFiltersProps {
    availableBrands: string[];
    selectedBrands: Set<string>;
    onToggleBrand: (brand: string) => void;

    // New Props for Families
    availableFamilies: string[];
    selectedFamilies: Set<string>;
    onToggleFamily: (familyId: string) => void;
}

export function SidebarFilters({
    availableBrands,
    selectedBrands,
    onToggleBrand,
    availableFamilies,
    selectedFamilies,
    onToggleFamily
}: SidebarFiltersProps) {
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [isFamiliesOpen, setIsFamiliesOpen] = useState(true);

    // Helper to get family name
    const getFamilyName = (id: string) => {
        return families.find(f => f.id === id)?.name || id;
    };

    return (
        <aside className="w-full lg:w-40 flex-shrink-0 space-y-6">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="font-outfit font-semibold text-xl text-gray-900">Filtros</h3>
            </div>

            {/* Families Filter */}
            {availableFamilies.length > 0 && (
                <div>
                    <button
                        onClick={() => setIsFamiliesOpen(!isFamiliesOpen)}
                        className="flex items-center justify-between w-full group mb-3"
                    >
                        <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide">Familias</h4>
                        {isFamiliesOpen ? (
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        )}
                    </button>

                    <div
                        className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isFamiliesOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {availableFamilies.map((familyId) => {
                            const isChecked = selectedFamilies.has(familyId);
                            return (
                                <label
                                    key={familyId}
                                    className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary/50 cursor-pointer"
                                            checked={isChecked}
                                            onChange={() => onToggleFamily(familyId)}
                                        />
                                    </div>
                                    <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {getFamilyName(familyId)}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Spacer if both are present */}
            {availableFamilies.length > 0 && <div className="border-t border-gray-100" />}

            {/* Brands Filter */}
            <div>
                <button
                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    className="flex items-center justify-between w-full group mb-3"
                >
                    <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide">Marcas</h4>
                    {isBrandsOpen ? (
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    )}
                </button>

                <div
                    className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isBrandsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    {availableBrands.map((brand) => {
                        const isChecked = selectedBrands.has(brand);
                        return (
                            <label
                                key={brand}
                                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary/50 cursor-pointer"
                                        checked={isChecked}
                                        onChange={() => onToggleBrand(brand)}
                                    />
                                </div>
                                <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                    {brand}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
