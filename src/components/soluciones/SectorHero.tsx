import { Sector } from "@/data/sectors";
import Image from "next/image";

interface SectorHeroProps {
    sector: Sector;
}

export function SectorHero({ sector }: SectorHeroProps) {
    return (
        <section className="relative w-full overflow-hidden" style={{ height: '400px' }}>
            {/* Background Image */}
            <Image
                src="/images/sectors/soluciones-generales-de-higiene.png"
                alt={sector.title}
                fill
                className="object-cover"
                priority
            />

            {/* Text overlay box with black background and 50% opacity */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="py-6 rounded-xl text-center"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        paddingLeft: '50px',
                        paddingRight: '50px',
                    }}
                >
                    <h1
                        className="text-white font-normal"
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '55px',
                            lineHeight: '1.2',
                        }}
                    >
                        Soluciones Integrales de Limpieza
                    </h1>
                </div>
            </div>
        </section>
    );
}
