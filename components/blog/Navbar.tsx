



"use client"
import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, PenSquare, BookOpen, Menu, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavBar(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

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

                  {/* {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          href="/write"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                        >
                          <PenSquare className="w-5 h-5" />
                          <span className="font-medium">Write</span>
                        </Link>
                      )}

                      <Link
                        href="/mystories"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">My Stories</span>
                      </Link>
                      <Link
                        href={`/profile?email=${user?.email}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600 justify-start w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign out</span>
                      </Button>
                    </>
                  ) : ( */}
                  <>
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <span className="font-medium">Sign In</span>
                    </Link>
                    <Link
                      href="/auth/register"
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
                Medium Clone
              </span>
            </Link>
          </div>

          {/* Right: Search + Profile */}
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

            {/* Profile Avatar or Auth Buttons */}
            {/* {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ml-2">
                    <Avatar className="h-9 w-9 ring-1 ring-gray-200 hover:ring-gray-300 transition-all">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">
                        {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border border-gray-100 shadow-lg">
                  <div className="px-3 py-2 mb-2 bg-gray-50/50 rounded-lg">
                    <p className="font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    {isAdmin && <span className="text-xs font-semibold text-emerald-600">Admin</span>}
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href={`/profile?email=${user.email}`} className="cursor-pointer rounded-md">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/posts" className="cursor-pointer rounded-md">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/mystories" className="cursor-pointer rounded-md">
                      <FileText className="w-4 h-4 mr-2" />
                      My Stories
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer rounded-md">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer rounded-md">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="hidden sm:inline-flex rounded-full px-5 text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    className="bg-gray-900 hover:bg-black text-white rounded-full px-5 transition-colors"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}








