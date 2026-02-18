import { notFound } from "next/navigation";
import { getAllSectors, getSectorBySlug } from "@/services/sectors";
import { getProductsBySector } from "@/services/products";
import { getAllFamilies } from "@/services/families";
import { SectorHero } from "@/components/soluciones/SectorHero";
import { SolutionsLayout } from "@/components/soluciones/SolutionsLayout";

// Generate static params for all solution slugs
export async function generateStaticParams() {
    const sectors = await getAllSectors();

    if (!sectors || sectors.length === 0) return [];

    return sectors.map((sector) => ({
        slug: sector.slug,
    }));
}

export const dynamicParams = false;

// Generate Metadata for SEO
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const sector = await getSectorBySlug(slug);

    if (!sector) {
        return {
            title: 'Sector no encontrado | Bienek',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${sector.title} | Soluciones Bienek`,
        description: sector.description || `Soluciones de limpieza para ${sector.title}`,
        openGraph: {
            title: `${sector.title} | Soluciones Bienek`,
            description: sector.description || undefined,
            images: sector.image
                ? [sector.image, ...previousImages]
                : previousImages,
        },
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function SolucionesPage({ params }: PageProps) {
    const { slug } = await params;
    const sector = await getSectorBySlug(slug);

    if (!sector) {
        notFound();
    }

    // Fetch products and families for this sector
    const [products, families] = await Promise.all([
        getProductsBySector(sector.id),
        getAllFamilies()
    ]);

    return (
        <main>
            <SectorHero title={sector.title} image={sector.image} />
            <SolutionsLayout
                initialProducts={products}
                initialFamilies={families}
                featuredFamilies={sector.featuredFamilies || []}
            />
        </main>
    );
}
