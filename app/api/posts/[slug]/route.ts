import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const postUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subtitle: z.string().max(300, 'Subtitle too long').optional(),
  content: z.string().min(1, 'Content is required'),
  slug: z.string(),
  authorName: z.string().min(1, 'Author name is required'),
  authorEmail: z.string().email('Invalid email address'),
  authorAvatar: z.string().url('Invalid URL').optional().or(z.literal('')),
  featuredImage: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  readTime: z.number().int().positive().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  publishedDate: z.string().datetime().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }>}
) {
  const { slug } = await params;
  try {
    
    
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Transform the post data to match frontend expectations
    const transformedPost = {
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      slug: post.slug,
      authorName: post.authorName,
      authorEmail: post.authorEmail,
      authorAvatar: post.authorAvatar,
      featuredImage: post.featuredImage,
      tags: post.tags,
      readTime: post.readTime,
      status: post.status,
      publishedDate: post.publishedDate?.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    return NextResponse.json(transformedPost, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', id: slug || "undefined"},
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug} = await params;
    const body = await request.json();

    // Validate the input
    const validatedData = postUpdateSchema.parse(body);

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if slug is already taken by another post
    const existingSlugPost = await prisma.post.findFirst({
      where:{
        slug:slug
      }
    });

    if (existingSlugPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { slug},
      data: {
        title: validatedData.title,
        subtitle: validatedData.subtitle,
        content: validatedData.content,
        slug: validatedData.slug,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail,
        authorAvatar: validatedData.authorAvatar || undefined,
        featuredImage: validatedData.featuredImage || undefined,
        tags: validatedData.tags || [],
        readTime: validatedData.readTime,
        status: validatedData.status,
        publishedDate: validatedData.publishedDate 
          ? new Date(validatedData.publishedDate)
          : validatedData.status === 'published' && existingPost.status !== 'published'
          ? new Date()
          : existingPost.publishedDate,
      }
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { slug }
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}