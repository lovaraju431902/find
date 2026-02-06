import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";


interface Post {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  author_name: string;
  author_email: string;
  author_avatar?: string;
  content: string;
  featured_image?: string;
  tags?: string[];
  read_time?: number;
  claps?: number;
  published_date?: string;
  created_date: string;
  status: 'draft' | 'published' | 'archived';
  access_tier?: 'free' | 'premium' | 'exclusive';
}

interface PostWithScore extends Post {
  score: number;
}

interface RelatedPostsProps {
  currentPostId: string;
  tags?: string[];
  authorEmail: string;
}

export default function RelatedPosts({ 
  currentPostId, 
  tags = [], 
  authorEmail 
}: RelatedPostsProps) {
  const { data: posts = [], isLoading } = useQuery<PostWithScore[]>({
    queryKey: ["relatedPosts", currentPostId, tags],
    queryFn: async () => {
      const response = await fetch(
        `/api/posts?status=published&limit=20&sort=-created_date`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const allPosts: Post[] = await response.json();
      
      // Filter out current post and prioritize by matching tags or same author
      const filtered: PostWithScore[] = allPosts
        .filter((p: Post) => p.id !== currentPostId)
        .map((post: Post): PostWithScore => {
          let score = 0;
          if (post.author_email === authorEmail) score += 2;
          if (post.tags) {
            const matchingTags = post.tags.filter((t: string) => tags.includes(t));
            score += matchingTags.length;
          }
          return { ...post, score };
        })
        .sort((a: PostWithScore, b: PostWithScore) => b.score - a.score)
        .slice(0, 3);
      
      return filtered;
    },
    enabled: !!currentPostId,
  });

  if (isLoading) {
    return (
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">More from Blogify</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-16/10 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">More from Blogify</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post: PostWithScore) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-gray-100">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-emerald-100 to-emerald-200" />
                )}
              </div>
              <h4 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h4>
            </Link>
            <Link
              href={`/profile?email=${post.author_email}`}
              className="flex items-center gap-2 group/author"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author_avatar} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                  {post.author_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600 group-hover/author:text-emerald-600 transition-colors">
                {post.author_name}
              </span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500">
                {post.read_time || 5} min read
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}