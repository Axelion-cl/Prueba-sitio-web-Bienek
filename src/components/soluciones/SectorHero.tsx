import { Sector } from "@/data/sectors";
import { ImageIcon } from "lucide-react";

interface SectorHeroProps {
    sector: Sector;
}

export function SectorHero({ sector }: SectorHeroProps) {
    return (
        <section className="relative" style={{ backgroundColor: '#f5f8fa', paddingTop: '48px', paddingBottom: '80px' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
                    {/* Icon/Image Placeholder */}
                    <div
                        className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: '#dbe4ec' }}
                    >
                        <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-red-500" strokeWidth={1.5} />
                    </div>

                    {/* Title with yellow underline */}
                    <div className="relative inline-block">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight font-bold">
                            {sector.title}
                        </h1>
                        {/* Yellow underline accent */}
                        <div
                            className="absolute -bottom-2 left-0 right-0 h-3 -z-10 opacity-70"
                            style={{ backgroundColor: '#ecec00' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
