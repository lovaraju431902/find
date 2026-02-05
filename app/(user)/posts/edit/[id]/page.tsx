import EditPostForm from '@/components/admin/editpost'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }>} ) => {
    const { id } = await params
    console.log(id)
  return (
    <div>
        <EditPostForm id={id} key={id}/>
    </div>
  )
}

export default page