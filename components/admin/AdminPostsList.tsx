import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical, Eye, Edit, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
interface Post {
  id:string;
  title: string;
  subtitle?: string;
  content: string;
  slug: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  featuredImage?: string;
  tags?: string[];
  readTime?: number | '';
  likesCount:number;
  commentsCount:number;
  status?: 'draft' | 'published' | 'archived';
  accessTier?: 'free' | 'premium' | 'exclusive';
  publishedDate:Date;
  createdAt:Date;
}

interface DeleteDialogState {
  open: boolean;
  post: Post | null;
}

export default function AdminPostsList(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({ 
    open: false, 
    post: null 
  });
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["adminPosts"],
    queryFn: async () => {
      const response = await fetch('/api/admin/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    }
  });


  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPosts"] });
      setDeleteDialog({ open: false, post: null });
    },
    onError: (error: Error) => {
      console.error('Error deleting post:', error);
      // Optionally show a toast or error message to the user
      alert(`Failed to delete post: ${error.message}`);
    },
  });
  

  const filteredPosts = posts.filter((post: Post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (): void => {
    if (deleteDialog.post) {
      deleteMutation.mutate(deleteDialog.post.id);
    }
  };

  const handleDialogOpenChange = (open: boolean): void => {
    setDeleteDialog({ open, post: null });
  };
  const router=useRouter()

  if (isLoading) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">All Posts</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Claps</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post: Post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-md truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>{post.authorName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={post.status === "published" ? "default" : "secondary"}
                        className={
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          post.accessTier === "free"
                            ? "border-gray-300"
                            : post.accessTier === "premium"
                            ? "border-emerald-300 text-emerald-700"
                            : "border-purple-300 text-purple-700"
                        }
                      >
                        {post.accessTier || "free"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {format(new Date(post.publishedDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{post.likesCount || 0}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/posts/${post.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/posts/edit/${post.id}`)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteDialog({ open: true, post })}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={deleteDialog.open} onOpenChange={handleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot; {deleteDialog.post?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, post: null })}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}