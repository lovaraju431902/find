"use client"
import React from "react";

import PostForm from "./AdminPostForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPostsList from "@/components/admin/AdminPostsList";
import AdminStatsList from "@/components/admin/AdminStatsList";
import AdminUsersList from "@/components/admin/AdminUsersList";
import { LayoutDashboard, FileText, Users,  } from "lucide-react";
import { motion } from "framer-motion";




export default function AdminDashboard(): React.JSX.Element {
  
   const [open,setOpen]=React.useState<boolean>(false)
     

if(open){
  return <>
  <PostForm/></>
}
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your blog content and users</p>
            </div>
            <Button
              onClick={() =>{setOpen(true)}}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              New Post
           
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="posts" className="gap-2">
                <FileText className="w-4 h-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AdminStatsList />
            </TabsContent>

            <TabsContent value="posts">
              <AdminPostsList />
            </TabsContent>

            <TabsContent value="users">
              <AdminUsersList />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}