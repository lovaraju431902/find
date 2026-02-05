"use client"
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditPostForm({id}:{id:string}) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: '',
    subtitle: '',
    content: '',
    slug: '',
    authorName: '',
    authorEmail: '',
    authorAvatar: '',
    featuredImage: '',
    views: '',
    comments: '',
    tags: [] as string[],
    readTime: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
  });
  const [tagInput, setTagInput] = React.useState('');

  // Fetch existing post data
  const { data: postData, isLoading: isPostLoading, isError: isPostError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      return response.json();
    },
  });

  // Initialize form data when post data is loaded
  React.useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.title || '',
        subtitle: postData.subtitle || '',
        content: postData.content || '',
        slug: postData.slug || '',
        authorName: postData.authorName || '',
        authorEmail: postData.authorEmail || '',
        authorAvatar: postData.authorAvatar || '',
        featuredImage: postData.featuredImage || '',
        tags: postData.tags || [],
        readTime: postData.readTime?.toString() || '',
        status: postData.status || 'draft',
        views: postData.views?.toString() || '',
        comments: postData.comments?.toString() || '',
      });
    }
  }, [postData]); // Only depend on postData

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          // Convert empty strings to undefined for optional fields
          subtitle: data.subtitle || undefined,
          authorAvatar: data.authorAvatar || undefined,
          featuredImage: data.featuredImage || undefined,
          readTime: data.readTime ? parseInt(data.readTime) : undefined,
          // Set publishedDate if status is published and wasn't before
          publishedDate: data.status === 'published' && postData?.status !== 'published' 
            ? new Date().toISOString() 
            : postData?.publishedDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('Post updated:', data);
      alert('Post updated successfully!');
      router.push('/431902admin'); // Redirect to admin dashboard
    },
    onError: (error: Error) => {
      console.error('Error updating post:', error);
      alert(error.message || 'Failed to update post. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePostMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (isPostLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading post data...</p>
        </div>
      </div>
    );
  }

  if (isPostError) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">Failed to load post data. Please try again.</p>
          <Button onClick={() => router.push('/431902admin')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
        <p className="text-gray-600">Edit your blog post details</p>
        {postData && (
          <p className="text-sm text-gray-500 mt-1">
            Editing: {postData.title} (ID: id)
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <Input
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <Input
            placeholder="Optional subtitle"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <Input
            placeholder="post-slug"
            value={formData.slug}
            onChange={(e) => handleInputChange('slug', e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            URL-friendly identifier (lowercase, hyphens only)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content (HTML) *
          </label>
          <Textarea
            placeholder="<h2>Your Title</h2><p>Your content here...</p>"
            className="min-h-50 font-mono text-sm"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter HTML content for the post body
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Name *
            </label>
            <Input
              placeholder="John Doe"
              value={formData.authorName}
              onChange={(e) => handleInputChange('authorName', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Email *
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.authorEmail}
              onChange={(e) => handleInputChange('authorEmail', e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Avatar URL
          </label>
          <Input
            placeholder="https://example.com/avatar.jpg"
            value={formData.authorAvatar}
            onChange={(e) => handleInputChange('authorAvatar', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image URL
          </label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={formData.featuredImage}
            onChange={(e) => handleInputChange('featuredImage', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button type="button" onClick={addTag} variant="secondary">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Read Time (minutes)
          </label>
          <Input
            type="number"
            placeholder="5"
            value={formData.readTime}
            onChange={(e) => handleInputChange('readTime', e.target.value)}
          />
        </div>


        <div className='flex gap-4 flex-row items-center'>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Views*
            </label>
            <Input
              placeholder="5"
              value={formData.views}
              onChange={(e) => handleInputChange('views', e.target.value)}
              required
            />
            </div>
             <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments*
            </label>
            <Input
              placeholder="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              required
            />
         </div>
         
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'draft' | 'published' | 'archived') => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={updatePostMutation.isPending}
          >
            {updatePostMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Post...
              </>
            ) : (
              'Update Post'
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              if (postData) {
                setFormData({
                  title: postData.title || '',
                  subtitle: postData.subtitle || '',
                  content: postData.content || '',
                  slug: postData.slug || '',
                  authorName: postData.authorName || '',
                  authorEmail: postData.authorEmail || '',
                  authorAvatar: postData.authorAvatar || '',
                  featuredImage: postData.featuredImage || '',
                  tags: postData.tags || [],
                  readTime: postData.readTime?.toString() || '',
                  status: postData.status || 'draft',
                  views: postData.views || '',
                  comments: postData.comments || '',
                });
              }
            }}
          >
            Reset
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => router.push('/431902admin')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}