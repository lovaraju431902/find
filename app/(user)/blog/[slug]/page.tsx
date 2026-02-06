import NewPostClient from '@/components/admin/newBlogslug'
import { Metadata } from 'next';


interface PageProps {
  params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  
  const { slug } = await params
 
  if (slug === undefined) {
    return {
      title: 'Blog - Blogify',
      description: 'Explore our latest blog posts.',
    };
  }

  // Fetch the post data server-side (same API as in your client component)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/posts/${slug}`);

  if (!response.ok) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const post = await response.json();

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Prepare metadata based on the fetched post
  const title = `${post.title} - Blogify`;
  const description = post.subtitle || `${post.title} - Read the latest article on our blog`;
  const imageUrl = post.featuredImage || '/images/default-blog-image.jpg';
  const url = `${baseUrl}/blog?slug=${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags?.join(', ') || 'blog, articles, news',
    authors: [{ name: post.authorName }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'Blogify',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.published_date || post.created_date,
      modifiedTime: post.created_date,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
 
 
    const { slug } = await params
  return (
    <div> 
        <NewPostClient slug={slug}/>
    </div>
  )
}

export default Page