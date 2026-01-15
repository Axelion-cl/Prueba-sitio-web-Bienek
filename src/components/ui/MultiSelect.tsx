'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface MultiSelectProps {
    label: string;
    options: { label: string; value: string }[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}

export function MultiSelect({ label, options, selected, onChange, placeholder = "Seleccionar..." }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter(s => s !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const removeOption = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        onChange(selected.filter(s => s !== value));
    };

    const selectedLabels = options.filter(o => selected.includes(o.value));

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary bg-white cursor-pointer min-h-[42px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-2 items-center">
                    {selectedLabels.length === 0 && (
                        <span className="text-gray-400 text-sm">{placeholder}</span>
                    )}
                    {selectedLabels.map(opt => (
                        <span key={opt.value} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-gray-200">
                            {opt.label}
                            <X
                                className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer"
                                onClick={(e) => removeOption(e, opt.value)}
                            />
                        </span>
                    ))}
                    <div className="ml-auto">
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map(opt => {
                        const isSelected = selected.includes(opt.value);
                        return (
                            <div
                                key={opt.value}
                                onClick={() => toggleOption(opt.value)}
                                className={`px-4 py-2 text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}`}
                            >
                                <span>{opt.label}</span>
                                {isSelected && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
