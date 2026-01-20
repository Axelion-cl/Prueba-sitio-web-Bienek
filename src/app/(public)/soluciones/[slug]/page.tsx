import { solutions } from "@/data/solutions";
import { SectorHero } from "@/components/soluciones/SectorHero";
import { SolutionsLayout } from "@/components/soluciones/SolutionsLayout";
import { products } from "@/data/mockProducts";
import { notFound } from "next/navigation";

// Generate static params for all solution slugs
export async function generateStaticParams() {
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false; // Required for static export

export default async function SolucionesPage({ params }: PageProps) {
    const { slug } = await params;
    const solution = solutions.find((s) => s.slug === slug);

    if (!solution) {
        notFound();
    }

    return (
        <main>
            <SectorHero title={solution.title} image={solution.image} />
            <SolutionsLayout initialProducts={products} />
        </main>
    );
}
