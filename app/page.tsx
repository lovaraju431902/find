
"use client"
import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "@/components/blog/PostCard";
import TagCloud from "@/components/blog/TagCloud";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "@/components/blog/Navbar";

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
  claps?: number;
  published_date?: string;
  created_date: string;
  status: 'draft' | 'published'
  access_tier?: 'free' | 'premium' | 'advanced';
}

const POSTS_PER_PAGE = 10;

export default function Home(): React.JSX.Element {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = pageParam * POSTS_PER_PAGE;
      const response = await fetch(
        `/api/posts?limit=${POSTS_PER_PAGE}&offset=${offset}&sort=-published_date`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      return jsonData;
    },
    getNextPageParam: (lastPage: Post[], allPages) => {
      return lastPage.length === POSTS_PER_PAGE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const posts = data?.pages.flat() ?? [];

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest Stories Header */}
            <div className="mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Latest Stories</h2>
              <p className="text-gray-500">
                Discover the most recent articles from our community of writers
              </p>
            </div>

            {/* Posts Feed */}
            {isLoading ? (
              <div className="space-y-10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="py-6 border-b border-gray-100 last:border-0">
                    <div className="flex gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Skeleton className="w-6 h-6 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex items-center gap-3 mt-4">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="hidden sm:block w-32 h-32 rounded-lg shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Unable to load stories</h3>
                <p className="text-gray-500 mb-4">{error?.message || 'An unknown error occurred'}</p>
                <button onClick={() => window.location.reload()} className="text-emerald-600 hover:text-emerald-700 font-medium">Try again</button>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    ref={index === posts.length - 1 ? lastPostRef : null}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  </div>
                ))}

                {isFetchingNextPage && (
                  <div className="py-12 flex justify-center">
                    <div className="flex items-center gap-3 text-gray-500">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <span className="font-medium">Loading more stories...</span>
                    </div>
                  </div>
                )}

                {!hasNextPage && posts.length > 0 && (
                  <div className="py-20 text-center text-gray-500">
                    <Sparkles className="w-6 h-6 mx-auto mb-3 text-emerald-500" />
                    <p className="font-medium">You&apos;ve reached the end</p>
                    <p className="text-sm mt-1">Time to write your own story?</p>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !isError && posts.length === 0 && (
              <div className="text-center py-24 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-gray-100">
                  <Sparkles className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No stories yet</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">The platform is fresh. Be the first to share your thoughts with the world.</p>
                {/* <Link href="/write"> */}
                {/* <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">Start writing</Button> */}
                {/* </Link> */}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <aside className="sticky top-24 space-y-10 pl-8 border-l border-gray-100">
              <TagCloud />

              {/* Footer Links */}
              <div className="pt-6">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                  <a href="#" className="hover:text-gray-600 transition-colors">Help</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Status</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Writers</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Blog</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Careers</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
                </div>
              </div>
            </aside>
          </div>


        </div>
      </div>
    </div>
  );
}
