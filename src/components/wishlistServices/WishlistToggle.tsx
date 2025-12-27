"use client"

import { useContext } from "react"
import { WishlistContext } from "../context/wishlistContext"
import AddProductToWishlist from "./addProductToWishlist"
import RemoveProductToWishlist from "./RemoveProductFromWishlist"

interface WishlistToggleProps {
  itemId: string
}

export default function WishlistToggle({ itemId }: WishlistToggleProps) {
  const { wishlistData } = useContext(WishlistContext)

  const isInWishlist = wishlistData?.data.some((item)=>item._id==itemId)


  return (
 <>
      {isInWishlist ? (
        <RemoveProductToWishlist itemId={itemId} />
      ) : (
        <AddProductToWishlist itemId={itemId} />
      )}
    </>
  )
}
