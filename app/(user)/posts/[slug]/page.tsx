

import PostPage from '@/components/admin/blogpage'


const page = async ({ params }: { params: Promise<{ slug: string }>} ) => {
    const { slug } = await params
    // console.log(id)
  return (
    <div>
        <PostPage slug={slug} key={slug} />
    </div>
  )
}

export default page