import { getAllProducts } from '@/services/products';
import EditProductView from '@/components/admin/products/EditProductView';

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export const dynamicParams = false; // Required for static export

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <EditProductView productId={id} />;
}
