'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import notFoundImage from "../../public/PageNotFound6.png"
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        
        {/* Image */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <Image
            src={notFoundImage} 
            alt="Page not found"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
        </div>

        {/* Button */}
        <Button asChild className="px-10 py-5">
          <Link href="/">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
