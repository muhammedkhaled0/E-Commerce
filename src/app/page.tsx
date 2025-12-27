'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl text-center space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Welcome to <span className="text-black">ShopMart</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-600 text-base md:text-lg"
        >
          A modern e-commerce experience designed to be fast, simple, and elegant.
          Browse products with ease, enjoy a clean black & white shopping interface, and
          find your favorites effortlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            onClick={() => router.push('/products')}
            className="px-8 py-6 text-base bg-black text-white hover:bg-gray-900 transition"
          >
            Explore Products
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}