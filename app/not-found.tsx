"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Image Container */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image 
              src="https://i.imgur.com/nICQGKS.png" 
              alt="Page not found" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Page Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page