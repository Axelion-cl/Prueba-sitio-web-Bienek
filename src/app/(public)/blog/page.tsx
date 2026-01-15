"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { articles, allCategories } from "@/data/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    // Filter Logic
    const filteredArticles = articles.filter((article) => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* 1. Header Section */}
            <section className="bg-gray-50 py-16 md:py-24 mb-12 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                        Blog Técnico
                    </h1>
                    <div className="mx-auto bg-[#ecec00] mb-6" style={{ width: '176px', height: '5px' }} />
                    <p className="text-xl text-gray-600 font-light">
                        Todos nuestros recursos a tu disposición
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4">
                {/* 2. Toolbar (Search & Filters) */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between max-w-5xl mx-auto">

                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2 lg:w-96">
                        <input
                            type="text"
                            placeholder="Encuentra los artículos que buscas..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] focus:border-transparent shadow-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Articles Grid */}
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="font-outfit font-semibold text-2xl text-gray-900 mb-8 border-l-4 border-[#ecec00] pl-4">
                        Artículos:
                    </h2>

                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {filteredArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg">No se encontraron artículos que coincidan con tu búsqueda.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("Todas") }}
                                className="mt-4 text-[#ecec00] hover:underline font-medium"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
