'use client';

import { HeroSection } from "@/components/home/HeroSection";
import { ValueCards } from "@/components/home/ValueCards";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // Mock sectors data sufficient for the SolutionsGrid based on Lite requirements
  const sectors = [
    {
      id: "higiene",
      slug: "soluciones-generales-de-higiene",
      title: t.sectores.higiene.title,
      description: t.sectores.higiene.description,
      image: "/assets/images/solutions/jardines.png",
      featuredFamilies: ["papeles", "jabones", "dispensadores"]
    },
    {
      id: "industrial",
      slug: "soluciones-especializadas-sector-industrial-y-almacenaje",
      title: t.sectores.industrial.title,
      description: t.sectores.industrial.description,
      image: "/assets/images/solutions/industria.png",
      featuredFamilies: ["desengrasantes", "epp"]
    },
    {
      id: "salud",
      slug: "soluciones-especializadas-sector-salud",
      title: t.sectores.salud.title,
      description: t.sectores.salud.description,
      image: "/assets/images/solutions/salud.png",
      featuredFamilies: ["desinfectantes-hosp", "insumos-medicos"]
    },
    {
      id: "institucional",
      slug: "soluciones-especializadas-sector-institucional",
      title: t.sectores.institucional.title,
      description: t.sectores.institucional.description,
      image: "/assets/images/solutions/oficinas.png",
      featuredFamilies: ["papeles", "dispensadores"]
    },
    {
      id: "educacion",
      slug: "soluciones-especializadas-sector-educacion",
      title: t.sectores.educacion.title,
      description: t.sectores.educacion.description,
      image: "/assets/images/solutions/educacion.png",
      featuredFamilies: ["jabones", "papeles"]
    },
    {
      id: "adulto-mayor",
      slug: "soluciones-para-centros-adulto-mayor",
      title: t.sectores.adultoMayor.title,
      description: t.sectores.adultoMayor.description,
      image: "/assets/images/solutions/adulto-mayor.png",
      featuredFamilies: ["desinfectantes-hosp"]
    },
    {
      id: "horeca",
      slug: "soluciones-especializadas-sector-horeca",
      title: t.sectores.horeca.title,
      description: t.sectores.horeca.description,
      image: "/assets/images/solutions/horeca.png",
      featuredFamilies: ["cafe", "vajilla"]
    },
    {
      id: "veterinario",
      slug: "soluciones-especializadas-sector-veterinario",
      title: t.sectores.veterinario.title,
      description: t.sectores.veterinario.description,
      image: "/assets/images/solutions/veterinaria.png",
      featuredFamilies: []
    },
    {
      id: "accesorios",
      slug: "equipamiento-accesorios",
      title: t.sectores.accesorios.title,
      description: t.sectores.accesorios.description,
      image: "/assets/images/solutions/limpieza-general.png",
      featuredFamilies: []
    },
    {
      id: "maquinaria",
      slug: "equipamientos-de-maquinaria",
      title: t.sectores.maquinaria.title,
      description: t.sectores.maquinaria.description,
      image: "/assets/images/solutions/maquinaria.png",
      featuredFamilies: []
    },
    {
      id: "aguas",
      slug: "tratamiento-de-agua",
      title: t.sectores.aguas.title,
      description: t.sectores.aguas.description,
      image: "/assets/images/solutions/aguas.png",
      featuredFamilies: []
    },
    {
      id: "embarcaciones",
      slug: "soluciones-para-embarcaciones",
      title: t.sectores.embarcaciones.title,
      description: t.sectores.embarcaciones.description,
      image: "/assets/images/solutions/embarcaciones.png",
      featuredFamilies: []
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ValueCards />
      <BrandCarousel />
      <SolutionsGrid sectors={sectors} />
    </main>
  );
}
