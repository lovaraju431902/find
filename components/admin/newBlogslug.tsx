


"use client"
import React, { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
import { Metadata } from 'next';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import RelatedPosts from "@/components/blog/RelatedPosts";
import { format } from "date-fns";
import { motion } from "framer-motion";


import {
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Bookmark,
  MoreHorizontal,
  Share2,
  Eye,
  MessageCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



interface User {
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Post {
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
  views?: number;
  comments?: number;
  published_date?: string; // ISO string format from API
  created_date?: string; // ISO string format from API
  status: 'draft' | 'published';
  access_tier?: 'free' | 'premium' | 'advanced';
}

export default function NewPostClient({ slug }: { slug: string }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  

  
  


  




















  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${slug}`);
      
      console.log("res", response);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const resdata = await response.json();
      console.log("main data", resdata);
      return resdata;
    },
    enabled: !!slug,
  });

  console.log(post, "post data");

  // Check follow status
  useEffect(() => {
    const checkFollow = async (): Promise<void> => {
      if (!post) return;
      try {
        // TODO: Implement follow functionality using actual API
        // const follows: Follow[] = await fetchFollows(user.email, post.authorEmail);
        // setIsFollowing(follows.length > 0);
      } catch (e) {
        console.error("Failed to check follow status:", e);
      }
    };
   checkFollow()
  }, [ post]);

  const handleFollow = async (): Promise<void> => {
    if (!user) {
      // Redirect to login page
      // router.push('/login');
      return;
    }
    if (!post) return;

    try {
      if (isFollowing) {
        // Remove follow
        // await removeFollow(user.email, post.authorEmail);
        setIsFollowing(false);
      } else {
        // Add follow
        // await addFollow(user.email, post.authorEmail);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const copyLink = (): void => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareOnTwitter = (): void => {
    if (!post) return;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const shareOnFacebook = (): void => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = (): void => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-24">
        <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8">

          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="aspect-video rounded-lg mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </article>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
          <p className="text-gray-600 mb-4">The story you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Go home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.published_date
    ? format(new Date(post.published_date), "MMM d, yyyy")
    : post.created_date
      ? format(new Date(post.created_date), "MMM d, yyyy")
      : "";

  return (

    <div className="min-h-screen pt-15 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Title */}
        <h1
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{post.subtitle}</p>
        )}

        {/* Author Info */}
        <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-8">
          <div className="flex items-center gap-4">
            <Link href={``}>
              <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                <AvatarImage src={post.author_avatar} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {post.authorName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href={``}
                  className="font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                >
                  {post.authorName}
                </Link>
                {user?.email !== post.authorEmail && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className={`h-7 px-3 ${isFollowing
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {formattedDate} · {post.read_time || 5} min read
              </p>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center  gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Share2 className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className='bg-white font-sm font-bold cursor-pointer'>
                <DropdownMenuItem onClick={copyLink}>
                  <Link2 className="w-4 h-4 mr-2 text-black" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnTwitter}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnFacebook}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnLinkedIn}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share on LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8 bg-gray-100">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-8"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "20px",
            lineHeight: "1.8",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <style>{`
          .prose h1, .prose h2, .prose h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 700;
          }
          .prose h1 { font-size: 32px; margin-bottom: 16px; }
          .prose h2 { font-size: 26px; margin-top: 32px; margin-bottom: 12px; }
          .prose h3 { font-size: 22px; margin-top: 24px; margin-bottom: 8px; }
          .prose p { margin-bottom: 24px; }
          .prose blockquote {
            border-left: 3px solid #10b981;
            padding-left: 20px;
            margin: 24px 0;
            font-style: italic;
            color: #4b5563;
          }
          .prose pre {
            background: #1f2937;
            color: #e5e7eb;
            padding: 16px;
            border-radius: 8px;
            margin: 24px 0;
            overflow-x: auto;
          }
          .prose img {
            max-width: 100%;
            border-radius: 8px;
            margin: 24px auto;
          }
          .prose a {
            color: #10b981;
            text-decoration: underline;
          }
          .prose ul, .prose ol {
            padding-left: 24px;
            margin-bottom: 24px;
          }
          .prose li {
            margin-bottom: 8px;
          }
        `}</style>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-100">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/search?tag=${encodeURIComponent(tag)}`}>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Clap Section */}
        <div className="flex items-center justify-between py-6 border-b border-gray-100">
         
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bookmark className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Share2 className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" >
                <DropdownMenuItem onClick={copyLink}>
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnTwitter}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOnLinkedIn}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>



            <div className="flex items-center gap-6 text-gray-500">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">
                                {post.views || "1.3k"} views
                               



                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments || "29"} comments</span>
                            </div>
                          </div>










        </div>

        {/* Author Card */}
        <div className="py-8 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <Link href={``}>
              <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                <AvatarImage src={post.author_avatar} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">
                  {post.authorName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link
                  href={``}
                  className="font-bold text-lg text-gray-900 hover:text-emerald-600 transition-colors"
                >
                  {post.authorName}
                </Link>
                {user?.email !== post.authorEmail && (
                  <Button
                    onClick={handleFollow}
                    className={`rounded-full ${isFollowing
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>
              <p className="text-gray-600 mt-1">
                Writer sharing thoughts and ideas on Blogify.
              </p>
            </div>
          </div>
        </div>

        {/* Comments */}
        {/* <CommentSection postId={post.id} /> */}

        {/* Related Posts */}
        <RelatedPosts
          currentPostId={post.id}
          tags={post.tags}
          authorEmail={post.authorEmail}
        />
      </motion.div>
    </div>
  );
}