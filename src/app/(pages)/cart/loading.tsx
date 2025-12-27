import React from 'react'

export default function Loading() {
  return (
    <>
        <div  className='h-screen w-full flex justify-center items-center bg-gray-200 loader-overlay'>
      <div className="loader">
        <span></span>
    </div>
</div>
    </>
  )
}
