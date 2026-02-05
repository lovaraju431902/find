"use client"
import React, { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
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
  Share2,
  Eye,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  claps?: number;
  published_date?: string; // ISO string format from API
  created_date?: string; // ISO string format from API
  status: 'draft' | 'published' | 'archived';
  access_tier?: 'free' | 'premium' | 'advanced';
}

export default function PostPage({ id }: { id: string }) {
  const router = useRouter();
  
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Post not found');
        }
        throw new Error('Failed to fetch post');
      }
      
      const resdata = await response.json();
      return resdata;
    },
    enabled: !!id,
  });

  // Check if post exists and is published
  useEffect(() => {
    if (post && post.status !== 'published') {
      // Redirect to 404 or show unauthorized message for non-published posts
      router.push('/404');
    }
  }, [post, router]);

  const handleShare = async (platform: string): Promise<void> => {
    if (!post) return;
    
    const url = `${window.location.origin}/posts/${post.id}`;
    const text = `Check out this post: ${post.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-64 w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The post you{`'`}re looking for doesn{`'`}t exist or has been removed.
            </p>
            <Button onClick={() => router.push('/')} className="bg-emerald-600 hover:bg-emerald-700">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-6 md:p-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title and Subtitle */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-xl text-gray-600 mb-6">
                {post.subtitle}
              </p>
            )}

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <Link href={`/profile?email=${post.authorEmail}`}>
                  <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage src={post.author_avatar} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {post.authorName?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link 
                    href={`/profile?email=${post.authorEmail}`}
                    className="font-bold text-lg text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    {post.authorName}
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.published_date && (
                        <span>
                          {format(new Date(post.published_date), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                    {post.read_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.read_time} min read</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleShare('copy')}
                  className="hover:bg-gray-100"
                >
                  <Link2 className="w-4 h-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShare('twitter')}>
                      <Twitter className="w-4 h-4 mr-2" />
                      Share on Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')}>
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Meta */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">1.2k views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">24 comments</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Published in</span>
                  <Badge variant="secondary">Technology</Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <div className="mt-12">
          <RelatedPosts
            currentPostId={post.id}
            tags={post.tags}
            authorEmail={post.authorEmail}
          />
        </div>
      </div>
    </div>
  );
}