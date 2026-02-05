import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TagCloudProps {
  selectedTag?: string;
  onTagSelect?: (tag: string) => void;
}

const popularTags: string[] = [
  "Technology",
  "Programming",
  "Design",
  "Writing",
  "Productivity",
  "Business",
  "Startup",
  "AI",
  "Self Improvement",
  "Health",
];

export default function TagCloud({ selectedTag, onTagSelect }: TagCloudProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Discover more of what matters to you
      </h3>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <Link
            key={tag}
            href={`/search?tag=${encodeURIComponent(tag)}`}
          >
            <Badge
              variant="secondary"
              className={`cursor-pointer px-3 py-1.5 text-xs font-normal transition-all rounded-full ${selectedTag === tag
                ? "bg-gray-900 text-white hover:bg-black"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              onClick={() => onTagSelect?.(tag)}
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div >
  );
}