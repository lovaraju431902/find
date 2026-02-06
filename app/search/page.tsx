
import Search from '@/components/admin/searchpage';
import { Suspense } from 'react';

export default function PostPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <Search/>
    </Suspense>
  );
}