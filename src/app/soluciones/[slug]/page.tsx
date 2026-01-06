import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectorHero } from "@/components/soluciones/SectorHero";
import { ProductGrid } from "@/components/soluciones/ProductGrid";
import { getSectorBySlug, sectors } from "@/data/sectors";
import { getProductsBySector } from "@/data/mockProducts";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return sectors.map((sector) => ({
        slug: sector.slug,
    }));
}

export default async function SolucionesPage({ params }: PageProps) {
    const { slug } = await params;
    const sector = getSectorBySlug(slug);

    if (!sector) {
        notFound();
    }

    const products = getProductsBySector(sector.id);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <SectorHero sector={sector} />
            <ProductGrid products={products} />
            <Footer />
        </main>
    );
}
