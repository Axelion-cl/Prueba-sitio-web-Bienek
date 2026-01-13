import Image from "next/image";
import Link from "next/link";
import { BannerBlockConfig } from "@/data/promo-layout";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
    config: BannerBlockConfig;
}

export function PromoBanner({ config }: PromoBannerProps) {
    const { title, description, image, backgroundColor, buttonText, buttonLink, orientation } = config;
    const isImageLeft = orientation === 'left';

    return (
        <section
            className="relative overflow-hidden rounded-2xl my-12"
            style={{ backgroundColor }}
        >
            <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center min-h-[400px]`}>

                {/* Image Side */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-[450px]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div
                        className={`absolute inset-0 ${isImageLeft ? 'lg:bg-gradient-to-l' : 'lg:bg-gradient-to-r'} from-transparent to-black/30 hidden lg:block`}
                    />
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isImageLeft ? 'lg:pl-16' : 'lg:pr-16'}`}>
                    <h2 className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                        {title}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                        {description}
                    </p>
                    <Link
                        href={buttonLink}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#ecec00] text-black font-bold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 self-start group"
                    >
                        {buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
