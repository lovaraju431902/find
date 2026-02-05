"use client"
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import TagCloud from "@/components/blog/TagCloud";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  status: 'draft' | 'published';

}

interface User {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
}

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialTag = searchParams.get("tag") || "";

  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [activeTag, setActiveTag] = useState<string>(initialTag);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      setActiveTag(tag);
    } else if (searchParams.has("tag") === false && activeTag) {
      // If tag is removed from URL (e.g. back button), clear it
      setActiveTag("");
    }
  }, [searchParams]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 3000);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search posts
  const { data: posts = [], isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["search", "posts", debouncedQuery, activeTag],
    queryFn: async () => {
      const response = await fetch(
        `/api/posts?status=published&limit=100&sort=-published_date`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const allPosts: Post[] = await response.json();
      let filtered = allPosts;

      if (activeTag) {
        filtered = filtered.filter((post: Post) =>
          post.tags?.some((t: string) => t.toLowerCase() === activeTag.toLowerCase())
        );
      }

      if (debouncedQuery) {
        const query = debouncedQuery.toLowerCase();
        filtered = filtered.filter((post: Post) =>
          post.title?.toLowerCase().includes(query) ||
          post.subtitle?.toLowerCase().includes(query) ||
          post.authorName?.toLowerCase().includes(query) ||
          post.tags?.some((t: string) => t.toLowerCase().includes(query))
        );
      }

      return filtered;
    },
    enabled: !!(debouncedQuery || activeTag),



  });

  // Search users


  // Derive unique users from posts
  const users = React.useMemo(() => {
    if (!posts.length) return [];

    const uniqueAuthors = new Map<string, User>();

    posts.forEach(post => {
      if (!uniqueAuthors.has(post.authorEmail)) {
        uniqueAuthors.set(post.authorEmail, {
          id: post.authorEmail, // Using email as ID since we don't have user ID
          email: post.authorEmail,
          full_name: post.authorName,
          avatar_url: post.author_avatar,
          // bio is not available in Post schema
        });
      }
    });

    return Array.from(uniqueAuthors.values());
  }, [posts]);

  const isLoadingUsers = isLoadingPosts;




  const clearSearch = (): void => {
    setSearchQuery("");
    setActiveTag("");
    window.history.replaceState({}, "", "/search");
  };

  const handleTagClick = (tag: string): void => {
    setActiveTag(tag);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for stories, people, or topics"
              className="pl-12 pr-12 py-6 text-lg border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
            />
            {(searchQuery || activeTag) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Active Tag */}
          {activeTag && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-500">Filtering by tag:</span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 gap-1"
              >
                {activeTag}
                <button onClick={() => {
                  setActiveTag("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("tag");
                  router.replace(`/search?${params.toString()}`);
                }}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            </div>
          )}
        </motion.div>

        {/* No Search State */}
        {!debouncedQuery && !activeTag && (
          <div className="py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Explore topics
            </h2>
            <TagCloud />
          </div>
        )}

        {/* Search Results */}
        {(debouncedQuery || activeTag) && (
          <Tabs defaultValue="stories" className="w-full">
            <TabsList className="mb-6 bg-transparent border-b border-gray-100 rounded-none w-full justify-start">
              <TabsTrigger
                value="stories"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              >
                Stories
                {posts.length > 0 && (
                  <span className="ml-2 text-gray-500">({posts.length})</span>
                )}
              </TabsTrigger>
              {debouncedQuery && (
                <TabsTrigger
                  value="people"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
                >
                  People
                  {users.length > 0 && (
                    <span className="ml-2 text-gray-500">({users.length})</span>
                  )}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="stories">
              {isLoadingPosts ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="py-6 border-b border-gray-100">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Skeleton className="w-6 h-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-6 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                        <Skeleton className="w-28 h-28 rounded-lg flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-900 mb-2">No stories found</p>
                  <p className="text-gray-500">
                    Try searching for something else
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  <div>
                    {posts.map((post: Post, index: number) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </TabsContent>

            <TabsContent value="people">
              {isLoadingUsers ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-900 mb-2">No people found</p>
                  <p className="text-gray-500">
                    Try searching for a different name
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((user: User, index: number) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/profile?email=${user.email}`}
                        className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">
                            {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">
                            {user.full_name || "Anonymous"}
                          </p>
                          {user.bio && (
                            <p className="text-gray-500 text-sm truncate">
                              {user.bio}
                            </p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}