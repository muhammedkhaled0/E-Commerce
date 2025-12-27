import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages=['/cart','/wishlist','/allorders']
const authPages=['/login','/register','forgot-password']
export default async function Proxy(req:NextRequest){
    const token=await getToken({req})
    if(protectedPages.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.next()
        }
        else{
           const redirctURL= new URL('/login',process.env.NEXTURL)
            return NextResponse.redirect(redirctURL)
        }
    }
    if(authPages.includes(req.nextUrl.pathname)){
        if(!token){
            return NextResponse.next()
        }
        else{
           const redirctURL= new URL('/products',process.env.NEXTURL)
            return NextResponse.redirect(redirctURL)
        }
    }
    return NextResponse.next()
}