'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { sectors } from '@/data/sectors';
import { families } from '@/data/families';
import { brands } from '@/data/brands';
import { badges } from '@/data/badges';
import { MultiSelect } from '@/components/ui/MultiSelect';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        sku: initialData?.sku || '',
        price: initialData?.price || '',
        brandIds: initialData?.brand ? [initialData.brand] : (initialData?.brandIds || []),
        sectorIds: initialData?.sectorIds || [],
        familyIds: initialData?.familyId ? [initialData.familyId] : (initialData?.familyIds || []),
        badges: initialData?.badges || [],
        description: initialData?.description || '',
        image: initialData?.images?.[0] || '/assets/images/solutions/limpieza-general.png'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would call API
        console.log('Saving product:', formData);
        alert('Producto guardado correctamente (Mock)');
        router.push('/admin/products');
    };

    // Options mapping
    const sectorOptions = sectors.map(s => ({ label: s.title, value: s.id }));
    const familyOptions = families.map(f => ({ label: f.name, value: f.id }));
    const brandOptions = brands.map(b => ({ label: b.name, value: b.name })); // Name as ID for brands
    const badgeOptions = badges.map(b => ({ label: b.name, value: b.name })); // Using Name as value to match current Product interface

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Ej: Detergente Industrial 5L"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <input
                                type="text"
                                required
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="SKU-12345"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Etiquetas y Clasificación</h3>

                        <MultiSelect
                            label="Sectores (Categorías)"
                            options={sectorOptions}
                            selected={formData.sectorIds}
                            onChange={(vals) => setFormData({ ...formData, sectorIds: vals })}
                            placeholder="Selecciona uno o más sectores..."
                        />

                        <MultiSelect
                            label="Familias"
                            options={familyOptions}
                            selected={formData.familyIds}
                            onChange={(vals) => setFormData({ ...formData, familyIds: vals })}
                            placeholder="Selecciona familias..."
                        />

                        <MultiSelect
                            label="Marcas"
                            options={brandOptions}
                            selected={formData.brandIds}
                            onChange={(vals) => setFormData({ ...formData, brandIds: vals })}
                            placeholder="Selecciona marcas..."
                        />

                        <MultiSelect
                            label="Distintivos (Badges)"
                            options={badgeOptions}
                            selected={formData.badges}
                            onChange={(vals) => setFormData({ ...formData, badges: vals })}
                            placeholder="Selecciona distintivos..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                            placeholder="Descripción detallada del producto..."
                        />
                    </div>
                </div>

                {/* Right Column: Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen Principal</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative h-64">
                        {/* Preview */}
                        <div className="absolute inset-0 p-4">
                            <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={formData.image}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {/* Overlay hint */}
                        <div className="absolute inset-x-0 bottom-6 flex justify-center z-10">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                                <Upload className="w-4 h-4" /> Cambiar imagen
                            </span>
                        </div>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        PNG, JPG hasta 5MB.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                    <X className="w-4 h-4" /> Cancelar
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    <Save className="w-4 h-4" /> {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
            </div>
        </form>
    );
}
