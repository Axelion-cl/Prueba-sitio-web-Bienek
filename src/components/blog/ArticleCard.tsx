import Image from "next/image";
import Link from "next/link";
import { Article } from "@/data/articles";

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="flex flex-col h-full bg-transparent group">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-200">
                {/* Fallback color defined above (bg-slate-200) serves as the requested blue/grey tone if image missing */}
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <h3 className="font-outfit font-bold text-xl text-gray-900 mb-3 leading-snug">
                    {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt}
                </p>

                {/* CTA Button */}
                <Link
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium text-black transition-transform active:scale-95 self-start hover:shadow-md"
                    style={{ backgroundColor: '#A7E0A0' }}
                >
                    Leer más
                </Link>
            </div>
        </article>
    );
}
