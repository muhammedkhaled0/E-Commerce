import { BrandI } from "./brandI"
import { CategoryI } from "./categoryI"

export interface ProductI {
  sold: number
  images: string[]
  sucarbcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}