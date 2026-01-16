"use client"
import React, { useContext, useState } from 'react'
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { HeartIcon, MenuIcon, ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../context/CartContext'
import Spinner from '../Spinner'
import { signOut, useSession } from 'next-auth/react'
import { WishlistContext } from '../context/wishlistContext'
import { useEffect } from "react";
export default function Navbar() {
  
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);
  const session=useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {cartData ,contextLoading,setCartData}= useContext(CartContext)
  const {wishlistData,setWishlistData}= useContext(WishlistContext)
  return (
     <nav className='py-3 mb-4 sticky shadow top-0 end-0 start-0 bg-accent z-10'>
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className='text-xl sm:text-2xl font-bold flex items-center'><div className='text-accent bg-accent-foreground w-8 h-8 rounded-md me-2 flex justify-center items-center'>S</div><Link href='/'>ShopMart</Link></h1> 
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:block">
  <NavigationMenuList>
       <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href='/products' className='font-semibold px-4 py-2 rounded-md transition-colors focus:bg-accent-foreground focus:text-gray-100 hover:bg-accent-foreground hover:text-gray-100'>Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
           <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href='/brands' className='font-semibold px-4 py-2 rounded-md transition-colors focus:bg-accent-foreground focus:text-gray-100 hover:bg-accent-foreground hover:text-gray-100'>Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href='/categories' className='font-semibold px-4 py-2 rounded-md transition-colors focus:bg-accent-foreground focus:text-gray-100 hover:bg-accent-foreground hover:text-gray-100'>Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
{
session.status=='authenticated'&&
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href='/allorders' className='font-semibold px-4 py-2 rounded-md transition-colors focus:bg-accent-foreground focus:text-gray-100 hover:bg-accent-foreground hover:text-gray-100'>All orders</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
        }

  </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4 relative">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
<label className="relative inline-flex items-center cursor-pointer">
  <input 
    type="checkbox" 
    className="sr-only peer" 
    checked={theme === 'dark'}
    onChange={() => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }}
  />
  <div className="w-13 h-8 rounded-full ring-0 duration-500 outline-none bg-gray-200 overflow-hidden
    before:flex before:items-center before:justify-center before:content-['☀️']
    before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700
    peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[oklch(0.16_0.04_255)]
    after:flex after:items-center after:justify-center after:content-['🌑'] after:absolute after:bg-[oklch(0.16_0.04_255)] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0
  "/>
</label>



            <DropdownMenu>
  <DropdownMenuTrigger className=''><UserIcon className="w-5 h-5 sm:w-6 sm:h-6"/></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
      session.status!='authenticated'?<>
      <Link href={'/login'}>
    <DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
    <Link href={'/register'}>
    <DropdownMenuItem>Register</DropdownMenuItem>
    </Link>
    </>
    :<DropdownMenuItem onClick={()=>signOut({callbackUrl:'/'})}>Logout</DropdownMenuItem>
    }
  </DropdownMenuContent>
</DropdownMenu>
{
session.status=='authenticated'&&
<Link href='/wishlist' className="relative hover:opacity-70 transition-opacity">
<HeartIcon className="w-5 h-5 sm:w-6 sm:h-6"/>
        <Badge className="h-5 min-w-5 rounded-full px-1 text-xs font-mono tabular-nums absolute -right-2 -top-2">
          {wishlistData?.count||0}
        </Badge>
        </Link>
        }
{
session.status=='authenticated'&&
<Link href='/cart' className="relative hover:opacity-70 transition-opacity">
<ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6"/>
        <Badge className="h-5 min-w-5 rounded-full px-1 text-xs font-mono tabular-nums absolute -right-2 -top-2">
          {!cartData? 0:contextLoading? <Spinner/>:cartData?.numOfCartItems}
        </Badge>
        </Link>
        }

</div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="w-full sm:hidden mt-4 pb-4">
                <div className="flex flex-col gap-2">
                  <Link 
                    href='/products' 
                    className='font-semibold px-4 py-2 rounded-md transition-colors hover:bg-accent-foreground hover:text-gray-100'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    href='/brands' 
                    className='font-semibold px-4 py-2 rounded-md transition-colors hover:bg-accent-foreground hover:text-gray-100'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Brands
                  </Link>
                  <Link 
                    href='/categories' 
                    className='font-semibold px-4 py-2 rounded-md transition-colors hover:bg-accent-foreground hover:text-gray-100'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Categories
                  </Link>
{
session.status=='authenticated'&&
                  <Link 
                    href='/allorders' 
                    className='font-semibold px-4 py-2 rounded-md transition-colors hover:bg-accent-foreground hover:text-gray-100'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All orders
                  </Link>
        }

                </div>
              </div>
            )}
        </div>
    </nav>
  )
}
