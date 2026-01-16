'use client';

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/typography";

import { sectors } from "@/data/sectors"; // Use admin data source
import { families } from "@/data/families"; // Import families to resolve IDs

// Helper to get family names from IDs
const getFamilyNames = (ids?: string[]) => {
    if (!ids) return [];
    return ids.map(id => families.find(f => f.id === id)).filter(Boolean);
};

export function SolutionsGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 space-y-12">
                <div className="text-center">
                    <Heading>Nuestras Soluciones</Heading>
                    <div className="mx-auto mt-4 bg-[#ecec00] rounded-full" style={{ width: '176px', height: '5px' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sectors.map((sector, index) => {
                        const subcategories = getFamilyNames(sector.featuredFamilies);

                        return (
                            <div
                                key={index}
                                className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md block isolate"
                            >
                                {/* Main Sector Link (Background Cover) */}
                                <Link
                                    href={`/soluciones/${sector.slug}`}
                                    className="absolute inset-0 z-10"
                                    aria-label={`Ver solución ${sector.title}`}
                                />

                                {/* Background Image */}
                                <Image
                                    src={sector.image}
                                    alt={sector.title}
                                    fill
                                    className="object-cover blur-on-hover group-hover:scale-110 -z-10"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity -z-10" />

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-all duration-300 group-hover:-translate-y-2 z-20 pointer-events-none">
                                    <h3 className="text-white text-xl font-bold font-sans mb-1 transition-transform duration-300">
                                        {sector.title}
                                    </h3>
                                    <div className="h-0.5 w-0 bg-primary group-hover:w-16 transition-all duration-300 mb-2" />

                                    {/* Dropdown Menu (Internal Hover) */}
                                    <ul className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 h-0 group-hover:h-auto overflow-hidden pointer-events-auto">
                                        {subcategories.map((sub, i) => (
                                            <li key={i} className="text-gray-200 text-sm hover:text-primary transition-colors flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary rounded-full" />
                                                {/* Link specific family parameter to the URL */}
                                                <Link
                                                    href={`/soluciones/${sector.slug}?family=${sub?.id}`}
                                                    className="hover:underline relative z-30 block py-0.5"
                                                >
                                                    {sub?.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="pt-2 text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                                            <Link href={`/soluciones/${sector.slug}`} className="relative z-30 flex items-center gap-1">
                                                Ver todo el sector
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
