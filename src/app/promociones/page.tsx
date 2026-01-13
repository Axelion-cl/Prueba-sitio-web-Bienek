import { promoBlocks, isGridBlock, isBannerBlock, GridBlockConfig, BannerBlockConfig } from "@/data/promo-layout";
import { PromoBanner } from "@/components/promociones/PromoBanner";
import { PromoGrid } from "@/components/promociones/PromoGrid";

export default function PromocionesPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <section className="bg-gray-50 py-16 md:py-24 mb-8 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                        Promociones
                    </h1>
                    <div className="mx-auto bg-[#ecec00] mb-6" style={{ width: '176px', height: '5px' }} />
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Nuestros productos en promoción
                    </p>
                </div>
            </section>

            {/* Dynamic Blocks */}
            <div className="container mx-auto px-4">
                {promoBlocks.map((block, index) => {
                    if (isGridBlock(block)) {
                        return <PromoGrid key={index} config={block.config as GridBlockConfig} />;
                    }
                    if (isBannerBlock(block)) {
                        return <PromoBanner key={index} config={block.config as BannerBlockConfig} />;
                    }
                    return null;
                })}
            </div>
        </main>
    );
}
