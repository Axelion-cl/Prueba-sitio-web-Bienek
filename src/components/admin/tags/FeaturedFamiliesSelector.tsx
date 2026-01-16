import { useState, useMemo } from 'react';
import { families, Family } from '@/data/families';
import { Search, X, Plus } from 'lucide-react';

interface FeaturedFamiliesSelectorProps {
    selectedIds: string[];
    onSelect: (ids: string[]) => void;
}

export default function FeaturedFamiliesSelector({ selectedIds = [], onSelect }: FeaturedFamiliesSelectorProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const availableFamilies = useMemo(() => {
        return families.filter(f =>
            !selectedIds.includes(f.id) &&
            f.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, selectedIds]);

    const selectedFamilies = useMemo(() => {
        return families.filter(f => selectedIds.includes(f.id));
    }, [selectedIds]);

    const handleAdd = (id: string) => {
        if (selectedIds.length >= 4) return;
        onSelect([...selectedIds, id]);
        setSearchTerm('');
    };

    const handleRemove = (id: string) => {
        onSelect(selectedIds.filter(fid => fid !== id));
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                Familias Destacadas (Máx. 4)
                <span className="text-xs text-gray-400 ml-2 font-normal">Aparecen en la tarjeta del Home</span>
            </label>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedFamilies.map(f => (
                    <div key={f.id} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-100">
                        {f.name}
                        <button onClick={() => handleRemove(f.id)} className="hover:text-red-500 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                {selectedFamilies.length === 0 && (
                    <span className="text-sm text-gray-400 italic">No hay familias seleccionadas</span>
                )}
            </div>

            {/* Search Input */}
            {selectedIds.length < 4 && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar familia para agregar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />

                    {/* Dropdown Results */}
                    {searchTerm && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {availableFamilies.length > 0 ? (
                                availableFamilies.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => handleAdd(f.id)}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between group"
                                    >
                                        {f.name}
                                        <Plus className="w-3 h-3 text-gray-400 group-hover:text-primary" />
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-400">No se encontraron resultados</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
