



"use client"
import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, PenSquare, BookOpen, Menu, Home } from "lucide-react";

export default function NavBar(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  

  // const { data: session } = authClient.useSession();
  // const user = session?.user;

  const handleSearch = (): void => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const user = null
  // const handleLogout = async (): Promise<void> => {
  //   await authClient.signOut({
  //     fetchOptions: {
  //       onSuccess: () => {
  //         router.push("/auth/login"); // Redirect to login after sign out
  //       },
  //     },
  //   });
  // };

  const isAdmin = ""

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Home className="w-5 h-5 text-gray-700" />
                    <span className="font-medium">Home</span>
                  </Link>

                
                  <>
                    <Link
                      href="/posts"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <span className="font-medium">Posts</span>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
                    >
                      <span className="font-medium">Get Started</span>
                    </Link>
                  </>

                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 font-serif">
                Earning Blogs
              </span>
            </Link>
          </div>

          {/* Right: Search */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Search Bar */}
            <div className="max-w-xs w-full hidden sm:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-gray-50 border-gray-100 rounded-full h-10 focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all"
                />
              </div>
            </div>

            {/* Mobile Search Icon */}
            <Link href="/search" className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            {/* Write Button - Desktop */}
            {user && isAdmin && (
              <Link href="/write" className="hidden md:block">
                <Button variant="ghost" className="gap-2 text-gray-500 hover:text-gray-900 hover:bg-transparent">
                  <PenSquare className="w-4 h-4" />
                  Write
                </Button>
              </Link>
            )}

          
          </div>
        </div>
      </div>
    </nav>
  );
}








