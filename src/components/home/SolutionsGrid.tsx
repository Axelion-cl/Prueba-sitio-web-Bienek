'use client';

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/typography";
import { useLanguage } from "@/context/LanguageContext";

// Define interface locally since service was deleted
interface Sector {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    featuredFamilies?: string[];
}

interface SolutionsGridProps {
    sectors: Sector[];
}

export function SolutionsGrid({ sectors }: SolutionsGridProps) {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 space-y-12">
                <div className="text-center">
                    <Heading>{t.home.nuestrasSoluciones}</Heading>
                    <div className="mx-auto mt-4 bg-[#ecec00] rounded-full" style={{ width: '176px', height: '5px' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sectors.map((sector, index) => {
                        return (
                            <div
                                key={index}
                                className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md block isolate"
                            >
                                {/* Main Sector Link (Background Cover) */}
                                <Link
                                    href="/contacto"
                                    className="absolute inset-0 z-10"
                                    aria-label={`${t.home.consultarPor} ${sector.title}`}
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

                                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {t.home.clickCotizar}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
