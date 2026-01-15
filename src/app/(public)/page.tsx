import { HeroSection } from "@/components/home/HeroSection";
import { ValueCards } from "@/components/home/ValueCards";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ValueCards />
      <BrandCarousel />
      <SolutionsGrid />
    </main>
  );
}
