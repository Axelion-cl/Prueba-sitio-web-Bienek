import { Sector } from "@/data/sectors";
import { Heading } from "@/components/ui/typography";
import { ImageIcon } from "lucide-react";

interface SectorHeroProps {
    sector: Sector;
}

export function SectorHero({ sector }: SectorHeroProps) {
    return (
        <section className="relative bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
                    {/* Icon/Image Placeholder - Matching PRD design */}
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f0f4f8] rounded-2xl flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#b8c9d9] rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Title */}
                    <Heading className="text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight font-bold">
                        {sector.title}
                    </Heading>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans max-w-2xl">
                        {sector.fullDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
