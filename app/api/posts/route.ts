import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';




const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  slug: z.string().min(1, 'Slug is required'),
  authorName: z.string().min(1, 'Author name is required').optional(),
  authorEmail: z.string().email('Valid email is required').optional(),
  authorAvatar: z.string().optional(),
  featuredImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readTime: z.number().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  views: z.string().optional(),
  comments: z.string().optional(),
  publishedDate: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    
    const {searchParams} = new URL(request.url);
    const limit = parseInt( "10");
    const offset = parseInt("0");
    const tag = searchParams.get("tag");
    
    // const slug = url.origin.split("/").pop() || "";


    // console.log("Slug from rote:", slug)

    // if (slug!==process.env.NEXT_PUBLIC_BASE_URL) {
    //   const post = await prisma.post.findFirst({
    //     where: {
    //       slug,
    //       status: "published"
    //     },
    //     select: {
    //       id: true,
    //       title: true,
    //       subtitle: true,
    //       slug: true,
    //       authorName: true,
    //       authorEmail: true,
    //       authorAvatar: true,
    //       content: true,
    //       featuredImage: true,
    //       tags: true,
    //       readTime: true,
          
    //       publishedDate: true,
    //       createdAt: true,
    //       status: true,

    //     }
    //   });

    //   if (!post) {
    //     return NextResponse.json(
    //       { error: 'Post not found' },
    //       { status: 404 }
    //     );
    //   }

    //   // Transform single post
    //   const transformedPost = {
    //     id: post.id,
    //     title: post.title,
    //     subtitle: post.subtitle,
    //     slug: post.slug,
    //     authorName: post.authorName,
    //     authorEmail: post.authorEmail,
    //     author_avatar: post.authorAvatar,
    //     content: post.content,
    //     featured_image: post.featuredImage,
    //     tags: post.tags,

     
    //     published_date: post.publishedDate?.toISOString(),
    //     created_date: post.createdAt.toISOString(),
    //     status: post.status,

    //   };

    //   return NextResponse.json(transformedPost, { status: 200 });
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause:any = {
      status: "published",
    };

    if (tag) {
      whereClause.tags = {
        has: tag
      };
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: {
        publishedDate: 'desc',
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        subtitle: true,
        slug: true,
        authorName: true,
        authorEmail: true,
        authorAvatar: true,
        content: true, // Be careful returning full content in list view if heavy
        featuredImage: true,
        tags: true,
        readTime: true,

        publishedDate: true,
        createdAt: true,
        status: true,

      }
    });


    const transformedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      slug: post.slug,
      authorName: post.authorName,
      authorEmail: post.authorEmail,
      author_avatar: post.authorAvatar,
      content: post.content,
      featured_image: post.featuredImage,
      tags: post.tags,
      read_time: post.readTime,
      published_date: post.publishedDate?.toISOString(),
      created_date: post.createdAt.toISOString(),
      status: post.status,
    }));

    return NextResponse.json(transformedPosts, { status: 200 });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // const session = await auth.api.getSession({
    //   headers: await headers()
    // });

    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized: Only admins can create posts' },
    //     { status: 403 }
    //   );
    // }

    const body = await request.json();

    // Validate the input using zod
    const validatedData = postSchema.parse(body);

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        subtitle: validatedData.subtitle,
        content: validatedData.content,
        slug: validatedData.slug,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail,
        authorAvatar: validatedData.authorAvatar,
        featuredImage: validatedData.featuredImage,
        tags: validatedData.tags || [],
        readTime: validatedData.readTime,
        status: validatedData.status || 'published',
        views: validatedData.views ,
        comments: validatedData.comments,
        publishedDate: validatedData.publishedDate ? new Date(validatedData.publishedDate) : undefined,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}






