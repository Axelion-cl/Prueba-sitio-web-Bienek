"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
    { name: "3M", src: "/assets/images/logos/3M.png" },
    { name: "Confort", src: "/assets/images/logos/Confort.png" },
    { name: "Elite", src: "/assets/images/logos/Elite.png" },
    { name: "Essity", src: "/assets/images/logos/Essity.png" },
    { name: "Igenix", src: "/assets/images/logos/Igenix.png" },
    { name: "Impeke", src: "/assets/images/logos/Impeke.png" },
    { name: "Kimberly-Clark", src: "/assets/images/logos/Kimberly-Clark.png" },
    { name: "Kleenex", src: "/assets/images/logos/Kleenex.png" },
    { name: "Lysoform", src: "/assets/images/logos/Lysoform.png" },
    { name: "Raid", src: "/assets/images/logos/Raid.png" },
    { name: "SC Johnson", src: "/assets/images/logos/SC_Johnson_2018.png" },
    { name: "Scott", src: "/assets/images/logos/Scott.png" },
    { name: "Softys", src: "/assets/images/logos/Softys.png" },
    { name: "Superior", src: "/assets/images/logos/Superior.png" },
    { name: "Tork", src: "/assets/images/logos/Tork-Logo.png" },
    { name: "Tremex", src: "/assets/images/logos/Tremex.png" },
    { name: "Virginia", src: "/assets/images/logos/Virginia.png" },
    { name: "Virutex Pro", src: "/assets/images/logos/Virutex Pro.png" },
    { name: "Wypall", src: "/assets/images/logos/Wypall.png" },
    { name: "Diversey", src: "/assets/images/logos/logo-diversey-1536x1087-NUEVO.png" },
    { name: "Taski", src: "/assets/images/logos/newTASKI-RGB-01-2.png" },
];

export function BrandCarousel() {
    const { t } = useLanguage();

    return (
        <section className="py-16 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-[106px] text-center relative z-10">
                <h2 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                    {t.home.marcasDestacadas}
                </h2>
                <div className="mx-auto bg-[#ecec00]" style={{ width: '176px', height: '5px' }} />
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade h-32 flex items-center">
                <div className="flex animate-scroll whitespace-nowrap w-max items-center h-full" style={{ gap: '128px' }}>
                    {/* Duplicate list for seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="relative h-24 w-48 opacity-100 hover:scale-110 cursor-pointer flex items-center justify-center shrink-0 transition-transform duration-300"
                            style={{ height: '96px', width: '192px' }}
                        >
                            <Image
                                src={brand.src}
                                alt={`${brand.name} Logo`}
                                fill
                                className="object-contain p-2"
                                sizes="192px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind Custom Animation */}
            <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
        .mask-linear-fade {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
             -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
}
