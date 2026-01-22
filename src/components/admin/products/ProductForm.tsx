'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { createProduct, updateProduct, uploadProductImage } from '@/services/admin/products';
import { MultiSelect } from '@/components/ui/MultiSelect';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Options from Supabase
    const [sectors, setSectors] = useState<any[]>([]);
    const [families, setFamilies] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        sku: initialData?.sku || '',

        brand: initialData?.brand || '',
        sectorIds: initialData?.sectorIds || [],
        familyIds: initialData?.familyIds || [],
        badges: initialData?.badges || [],
        description: initialData?.description || '',
        images: initialData?.images || ['/assets/images/solutions/limpieza-general.png'],
        specs: initialData?.specs || {},
        brand_logo: initialData?.brand_logo || ''
    });

    // Fetch options from Supabase on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [sectorsRes, familiesRes, brandsRes, badgesRes] = await Promise.all([
                    supabase.from('sectors').select('id, title').order('title'),
                    supabase.from('families').select('id, name').order('name'),
                    supabase.from('brands').select('id, name, logo').order('name'),
                    supabase.from('badges').select('id, name').order('name')
                ]);
                setSectors(sectorsRes.data || []);
                setFamilies(familiesRes.data || []);
                setBrands(brandsRes.data || []);
                setBadges(badgesRes.data || []);
            } catch (err) {
                console.error('Error fetching options:', err);
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchOptions();

        // If editing, also fetch existing relations
        if (isEditing && initialData?.id) {
            fetchProductRelations(initialData.id);
        }
    }, [isEditing, initialData?.id]);

    const fetchProductRelations = async (productId: string) => {
        const [sectorsRel, familiesRel] = await Promise.all([
            supabase.from('product_sectors').select('sector_id').eq('product_id', productId),
            supabase.from('product_families').select('family_id').eq('product_id', productId)
        ]);

        if (sectorsRel.data) {
            setFormData(prev => ({ ...prev, sectorIds: sectorsRel.data!.map(r => r.sector_id) }));
        }
        if (familiesRel.data) {
            setFormData(prev => ({ ...prev, familyIds: familiesRel.data!.map(r => r.family_id) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const productData = {
                id: initialData?.id,
                name: formData.name,
                sku: formData.sku,

                brand: formData.brand,
                brand_logo: formData.brand_logo,
                description: formData.description,
                images: formData.images,
                specs: formData.specs,
                badges: formData.badges,
                sectorIds: formData.sectorIds,
                familyIds: formData.familyIds
            };

            let result;
            if (isEditing && initialData?.id) {
                result = await updateProduct(initialData.id, productData);
            } else {
                result = await createProduct(productData);
            }

            if (result.success) {
                router.push('/admin/products');
            } else {
                alert('Error: ' + result.error);
            }
        } finally {
            setSaving(false);
        }
    };

    // Options mapping
    const sectorOptions = sectors.map(s => ({ label: s.title, value: s.id }));
    const familyOptions = families.map(f => ({ label: f.name, value: f.id }));
    const brandOptions = brands.map(b => ({ label: b.name, value: b.name }));
    const badgeOptions = badges.map(b => ({ label: b.name, value: b.name }));

    const handleBrandChange = (vals: string[]) => {
        // Take the last selected value to simulate single select behavior in MultiSelect
        const selectedBrand = vals.length > 0 ? vals[vals.length - 1] : '';

        const brandData = brands.find(b => b.name === selectedBrand);
        setFormData({
            ...formData,
            brand: selectedBrand,
            brand_logo: brandData?.logo || ''
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const result = await uploadProductImage(file);

            if (!result.success) {
                throw new Error(result.error);
            }

            setFormData(prev => ({
                ...prev,
                images: [result.url!] // Currently handling single image principal
            }));

        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error al subir imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loadingOptions) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

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

                    <div className="grid grid-cols-1 gap-4">
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
                            label="Marca"
                            options={brandOptions}
                            selected={formData.brand ? [formData.brand] : []}
                            onChange={handleBrandChange}
                            placeholder="Selecciona marca..."
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
                                    src={formData.images[0] || '/assets/images/solutions/limpieza-general.png'}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {/* Overlay hint */}
                        <div className="absolute inset-x-0 bottom-6 flex justify-center z-10">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {uploading ? 'Subiendo...' : 'Cambiar imagen'}
                            </span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading || saving}
                        />
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
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
            </div>
        </form>
    );
}
