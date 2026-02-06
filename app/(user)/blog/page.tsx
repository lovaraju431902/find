
// import { Suspense } from 'react';
// import PostClient from '@/components/admin/blogs';  // new file
// import { Metadata } from 'next';


// export async function generateMetadata(): Promise<Metadata> {
  
  
//   if (!post) {
//     return {
//       title: 'Post Not Found',
//       description: 'The requested blog post could not be found.',
//     };
//   }

//   // Prepare metadata
//   const title = post.title;
//   const description = post.subtitle || `${post.title} - Read the latest article on our blog`;
//   const imageUrl = post.featured_image || '/images/default-blog-image.jpg';
//   const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog?slug=${post.slug}`;
  
//   return {
//     title: `${post.title} - Blogify`,
//     description: description,
//     keywords: post.tags?.join(', ') || 'blog, articles, news',
//     authors: [{ name: post.authorName }],
//     openGraph: {
//       title: post.title,
//       description: description,
//       url: url,
//       siteName: 'Blogify',
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//       locale: 'en_US',
//       type: 'article',
//       publishedTime: post.published_date || post.created_date,
//       modifiedTime: post.created_date,
//       authors: [post.authorName],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: description,
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: url,
//     },
//   };
// }











// export default function PostPage() {
//   return (
//     <Suspense fallback={<div>Loading posts...</div>}>
//       <PostClient />
//     </Suspense>
//   );
// }



























import { Suspense } from 'react';
import PostClient from '@/components/admin/blogs'; // Assuming this is your client-side Post component

import { Metadata } from 'next';



// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const { slug } = params || { slug: undefined };
 
//   if (slug === undefined) {
//     return {
//       title: 'Blog - Blogify',
//       description: 'Explore our latest blog posts.',
//     };
//   }

//   // Fetch the post data server-side (same API as in your client component)
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//   const response = await fetch(`${baseUrl}/api/posts?slug=${slug}`);

//   if (!response.ok) {
//     return {
//       title: 'Post Not Found',
//       description: 'The requested blog post could not be found.',
//     };
//   }

//   const post = await response.json();

//   if (!post) {
//     return {
//       title: 'Post Not Found',
//       description: 'The requested blog post could not be found.',
//     };
//   }

//   // Prepare metadata based on the fetched post
//   const title = `${post.title} - Blogify`;
//   const description = post.subtitle || `${post.title} - Read the latest article on our blog`;
//   const imageUrl = post.featured_image || '/images/default-blog-image.jpg';
//   const url = `${baseUrl}/blog?slug=${post.slug}`;

//   return {
//     title,
//     description,
//     keywords: post.tags?.join(', ') || 'blog, articles, news',
//     authors: [{ name: post.authorName }],
//     openGraph: {
//       title: post.title,
//       description,
//       url,
//       siteName: 'Blogify',
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//       locale: 'en_US',
//       type: 'article',
//       publishedTime: post.published_date || post.created_date,
//       modifiedTime: post.created_date,
//       authors: [post.authorName],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description,
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: url,
//     },
//   };
// }

export default function page() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostClient />
    </Suspense>
  );
}