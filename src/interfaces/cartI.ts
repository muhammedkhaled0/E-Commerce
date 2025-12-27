import { ProductI } from "./productI"

export interface CartI {
  status: string
  message?:string
  numOfCartItems: number
  cartId: string
  data: Data
}
export interface Data {
  _id: string
  cartOwner: string
  products: Item[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}
export interface Item {
  count: number
  _id: string
  product: ProductI
  price: number
}
export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
