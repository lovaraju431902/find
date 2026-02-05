"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [readTime, setReadTime] = useState('');
  const [views, setViews] = useState('0');
  const [comments, setComments] = useState('0');
  const [status, setStatus] = useState('draft');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      title,
      subtitle: subtitle || undefined,
      content,
      slug,
      authorName: authorName || undefined,
      authorEmail: authorEmail || undefined,
      authorAvatar: authorAvatar || undefined,
      featuredImage: featuredImage || undefined,
      tags,
      readTime: readTime ? parseInt(readTime) : undefined,
      views: parseInt(views) || 0,
      comments: parseInt(comments) || 0,
      status,
      publishedDate: status === 'published' ? new Date().toISOString() : undefined,
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('Post created:', data);
      alert('Post created successfully!');
      
      // Reset form
      setTitle('');
      setSubtitle('');
      setContent('');
      setSlug('');
      setAuthorName('');
      setAuthorEmail('');
      setAuthorAvatar('');
      setFeaturedImage('');
      setTags([]);
      setReadTime('');
      setViews('0');
      setComments('0');
      setStatus('draft');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-gray-600">Fill in the details to create a new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <Input 
            placeholder="Enter post title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <Input 
            placeholder="Optional subtitle" 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <Input 
            placeholder="post-slug" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML) *</label>
          <Textarea 
            placeholder="<h2>Your Title</h2><p>Your content here...</p>" 
            className="min-h-50 font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Enter HTML content for the post body</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
            <Input 
              placeholder="John Doe" 
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Email *</label>
            <Input 
              type="email"
              placeholder="john@example.com" 
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Avatar URL</label>
          <Input 
            placeholder="https://example.com/avatar.jpg" 
            value={authorAvatar}
            onChange={(e) => setAuthorAvatar(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
          <Input 
            placeholder="https://example.com/image.jpg" 
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
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
            {tags.map((tag) => (
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (minutes)</label>
          <Input 
            type="number" 
            placeholder="5" 
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </div>

        <div className='flex flex-row gap-4'>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Views *</label>
            <Input 
              type="number" 
              placeholder="Enter views" 
              value={views}
              onChange={(e) => setViews(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments *</label>
            <Input 
              type="number" 
              placeholder="Enter comments" 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Create Post
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setTitle('');
              setSubtitle('');
              setContent('');
              setSlug('');
              setAuthorName('');
              setAuthorEmail('');
              setAuthorAvatar('');
              setFeaturedImage('');
              setTags([]);
              setReadTime('');
              setViews('0');
              setComments('0');
              setStatus('draft');
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}