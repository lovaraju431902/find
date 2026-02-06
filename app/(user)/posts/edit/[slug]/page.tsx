import EditPostForm from '@/components/admin/editpost'
import React from 'react'

const page = async ({ params }: { params: Promise<{ slug: string }>} ) => {
    const { slug } = await params
    // console.log(id)
  return (
    <div>
        <EditPostForm slug={slug} key={slug}/>
    </div>
  )
}

export default page