"use client";
import { useState } from "react";
import { ChevronDown, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IoCartOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import {  LogOut } from "lucide-react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import Link from "next/link";


import { Package, LayoutDashboard,X, Menu, LucideIcon, ShoppingCart, Contact } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet,  SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";



interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon | typeof MdOutlineContactSupport | typeof MdOutlinePrivacyTip;
}

const menuItems: MenuItem[] = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'My Purchases', href: '/my-purchases', icon: ShoppingCart },
  { name: ' Privacy & Policies', href: '/privacy-policies', icon: MdOutlineContactSupport},
  { name: 'Contact & Help', href: '/contact-help', icon: Contact },
  { name: 'Logout', href: '/logout', icon: LogOut },

];


const Header = () => {
  const [isProfile, setIsProfile] = useState<boolean>(true);
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState<boolean>(false)
  const email = "lovarajuk431902@gmail.com"
  const user = "lovarajuk431902"
  const cartsize=0
  const notificationcount=0

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-25 tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <a href="/home" className="hidden sm:block">
          <div className="flex ">
            <Image
              src="https://i.imgur.com/BJ2aUae.png"
              alt="logo"
              width={36}
              height={36}
            />
            <span className="ml-2 text-2xl text-slate-900  font-bold">
              CodeMarket
            </span>
          </div>
        </a>

        <a href="#" className="block sm:hidden">
          <div className="flex">
            <Image
              src="https://i.imgur.com/BJ2aUae.png"
              alt="logo"
              width={36}
              height={36}
            />
            <span className="ml-2 text-2xl text-slate-900  font-bold">
              CodeMarket
            </span>
          </div>
        </a>

        <div className="hidden sm:block">
          <Button
            variant="outline"
            className="border-none text-sm shadow-none hover:text-xl hover:cursor-pointer"
          >
            Home
          </Button>
          <Button
            variant="outline"
            className=" border-none text-sm shadow-none hover:text-xl hover:cursor-pointer"
          >
            Products
          </Button>
          <Button
            variant="outline"
            className=" border-none text-sm shadow-none hover:text-xl hover:cursor-pointer"
          >
            Categories
          </Button>
          <Button
            variant="outline"
            className=" border-none text-sm shadow-none hover:text-xl hover:cursor-pointer"
          >
            Blogs
          </Button>
          <Button
            variant="outline"
            className=" border-none text-sm shadow-none hover:text-xl hover:cursor-pointer"
          >
            Contact
          </Button>
        </div>

        {isProfile ? (
          <>
          <div className="sm:block hidden">
            <div className="flex  items-center gap-3 relative border-none">
             <span className="relative">
              <Badge className={`absolute left-3 bottom-3 w-4 h-4 ${notificationcount>0? "bg-blue-500":"bg-transparent"} `}>{notificationcount>0?notificationcount:''}</Badge>
              
              <IoMdNotificationsOutline size={30} className="text-black-600" />
             </span>
              <span className="relative">
                <Badge className={`absolute left-3 bottom-3 w-4 h-4 ${cartsize>0? "bg-blue-500":"bg-transparent"} `}>{cartsize>0?cartsize :""}</Badge>
              
              <IoCartOutline size={30} className="text-black-600" />
               </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className='gap-2 text-black'>
                    <Avatar>
                      <AvatarImage src="https://i.imgur.com/BJ2aUae.png" />
                      <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-3">
                    <p className="font-semibold text-slate-900">{user || 'User'}</p>
                    <p className="text-sm text-slate-500">{email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="space-y-3">
                  <DropdownMenuItem asChild>
                    <a href="/profile" className="cursor-pointer">
                      <User2 className="w-4 h-4 mr-2" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/my-purchases" className="cursor-pointer">
                      <Package className="w-4 h-4 mr-2" />
                      My Purchases
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/privacy-policies" className="cursor-pointer">
                      <MdOutlinePrivacyTip className="w-4 h-4 mr-2" />
                      Privacy &amp; Policies
                    </a>
                  </DropdownMenuItem>

                  {/* Admin dashboard link - would need to check role from database */}
                  <DropdownMenuItem asChild>
                    <a href="/admin/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => { }}
                    className="text-white bg-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
                  >
                    <LogOut className="w-4 text-white h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>           
               </div>
              </div>



          




          <div className="sm:hidden block">
            <div className="flex  items-center gap-10 relative border-none">
             <span className="relative">
              <Badge className={`absolute left-3 bottom-3 w-4 h-4 ${notificationcount>0? "bg-blue-500":"bg-transparent"} `}>{notificationcount>0?notificationcount:''}</Badge>
              
              <IoMdNotificationsOutline size={30} className="text-black-600" />
             </span>
              <span className="relative">
                <Badge className={`absolute left-3 bottom-3 w-4 h-4 ${cartsize>0? "bg-blue-500":"bg-transparent"} `}>{cartsize>0?cartsize :""}</Badge>
              
              <IoCartOutline size={30} className="text-black-600" />
               </span>
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg">
                
              
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <div className="flex mt-1">
            <Image
              src="https://i.imgur.com/BJ2aUae.png"
              alt="logo"
              width={36}
              height={36}
            />
            <span className="ml-2 text-2xl text-slate-900  font-bold">
              CodeMarket
            </span>
          </div>
                  
                </SheetHeader >
               




                     {/* Navigation */}
      <nav className="flex-1 p-4">
        {/* <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
         sdfg
        </p> */}
        <ul className="space-y-1">
          {menuItems.map((item) => {
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center hover:bg-slate-300 gap-3 px-3 py-2.5 rounded-lg transition-all ${item.name === 'Logout' ? 'bg-red-500 text-white' : ''}`}>  
              
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                 
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


              
              </SheetContent>
              


              </Sheet>
                 


                


            </div>

            </div>





          </>





        ) : (
          <>
            <div className="flex">
              <Button
                size="lg"
                className="border-none bg-linear-to-r h-11 pl-3 pr-3 rounded-2xl from-fuchsia-600 to-indigo-700 hover:from-fuchsia-700 hover:to-indigo-800 transition"
              >
                <span className="flex items-center gap-2">
                  <User className="text-white" />
                  <span>Create Account</span>
                </span>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
