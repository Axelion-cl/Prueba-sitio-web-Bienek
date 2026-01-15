'use client';

import { ProductForm } from '@/components/admin/products/ProductForm';

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
            <ProductForm />
        </div>
    );
}
