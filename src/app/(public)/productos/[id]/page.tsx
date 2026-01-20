import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/mockProducts";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { RelatedProducts } from "@/components/products/RelatedProducts";

// Generate static params for all products (ISR strategy)
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export const dynamicParams = false; // Required for static export

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">

            {/* 1. Hero Content (Breadcrumb could go here) */}
            <div className="container mx-auto px-4 lg:px-8 pt-6 pb-12">

                {/* 2. Main Product Section: Gallery + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-1">

                    {/* Left: Gallery (7 Cols) */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Right: Critical Info (5 Cols) */}
                    <div className="lg:col-span-5 pt-4 flex flex-col gap-12">
                        <ProductInfo product={product} />

                        {/* Description & Specs (Moved here) */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold font-outfit uppercase tracking-wider mb-3 border-l-4 border-[#ecec00] pl-3">
                                    Descripción del Producto
                                </h3>
                                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-base">
                                    <p>{product.description}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold font-outfit uppercase tracking-wider mb-4 border-l-4 border-[#ecec00] pl-3 mt-8">
                                    Especificaciones Técnicas
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-5 md:p-6">
                                    <dl className="grid grid-cols-1 gap-y-4">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0 flex justify-between">
                                                <dt className="text-sm font-bold text-gray-900 uppercase">{key}</dt>
                                                <dd className="text-gray-600 text-sm text-right">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. Description & Specs Container Removed */}


            {/* 4. Related Products */}
            <RelatedProducts relatedIds={product.relatedProducts} />
        </main>
    );
}
