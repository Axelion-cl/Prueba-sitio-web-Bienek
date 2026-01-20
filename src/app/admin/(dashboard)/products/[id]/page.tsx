import { products } from '@/data/mockProducts';
import EditProductView from '@/components/admin/products/EditProductView';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export const dynamicParams = false; // Required for static export

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <EditProductView productId={id} />;
}
