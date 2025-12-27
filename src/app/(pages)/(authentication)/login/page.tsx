import LoginForm from '@/components/LoginForm'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
    <LoginForm/>
    </Suspense>
  )
}
