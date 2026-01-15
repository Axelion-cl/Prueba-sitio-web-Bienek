'use client';

import { useParams } from 'next/navigation';
import { getProductById } from '@/data/mockProducts';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
    const params = useParams();
    // In a real app we would fetch data here
    // decodeURIComponent is good practice if ID has special chars
    const id = decodeURIComponent(params.id as string);
    const product = getProductById(id);

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-800">Producto no encontrado</h2>
                <Link href="/admin/products" className="text-primary hover:underline mt-2 inline-block">
                    Volver al listado
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Editar Producto: <span className="text-gray-500 font-normal text-lg">{product.id}</span></h1>
            </div>

            <ProductForm initialData={product} isEditing />
        </div>
    );
}
