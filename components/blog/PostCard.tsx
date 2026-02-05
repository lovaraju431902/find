"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Bookmark, MoreHorizontal, Heart, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  authorName: string;
  authorEmail: string;
  author_avatar?: string;
  content: string;
  featured_image?: string;
  tags?: string[];
  read_time?: number;

  published_date?: string;
  created_date: string;
  status: "draft" | "published";

}

interface Comment {
  id: string;
  post_id: string;
  content: string;
  author_email: string;
  created_date: string;
}

interface PostCardProps {
  post: Post;

}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.published_date
    ? format(new Date(post.published_date), "MMM d")
    : format(new Date(post.created_date), "MMM d");

  // Get comment count for this post
  // const { data: comments = [] } = useQuery<Comment[]>({
  //   queryKey: ["commentCount", post.id],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/comments?post_id=${post.id}`);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     return response.json();
  //   },
  // });


  return (
    <article className="group py-6 border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
          <div className="space-y-2">
            {/* Author Info */}
            <Link
              href={`/profile?email=${post.authorEmail}`}
              className="flex items-center gap-2 group/author"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={post.author_avatar} />
                <AvatarFallback className="bg-gray-100 text-gray-700 text-[10px]">
                  {post.authorName?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900">
                {post.authorName}
              </span>
            </Link>

            {/* Title + Subtitle */}
            <Link href={`/blog?slug=${post.slug}`} className="block group/link">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mb-1 leading-tight group-hover/link:text-gray-700 transition-colors">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-gray-500 font-serif leading-relaxed line-clamp-2 md:line-clamp-3">
                  {post.subtitle}
                </p>
              )}
            </Link>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
                free
              </span>
              <span>{post.read_time || 5} min read</span>
              <span>·</span>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1 group/stats cursor-default">
                <Heart className="w-4 h-4 group-hover/stats:text-red-500 transition-colors" />
                <span className="text-xs group-hover/stats:text-gray-600 transition-colors"> 10k</span>
              </div>
              <Bookmark className="w-4 h-4 hover:text-gray-800 cursor-pointer transition-colors" />
              <MoreHorizontal className="w-4 h-4 hover:text-gray-800 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {post.featured_image && (
          <Link href={`/blog?slug=${post.slug}`} className=" flex-shrink-0">
            <div className="relative w-28 h-28 sm:w-36 sm:h-28 md:w-40 md:h-28 bg-gray-100 rounded-sm overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}