import CredentialsProvider from "next-auth/providers/credentials"
import { FailedLogin, SuccessLogin } from "@/interfaces"
import { AuthOptions } from "next-auth"
export const authOptions:AuthOptions= {    
providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{},
                password:{},
            },
            authorize:async(credentials)=>{
               const res=await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
                method:'POST',
                body:JSON.stringify({
                email:credentials?.email,
                password:credentials?.password
               }),
               headers:{
                'content-type':'application/json',
               }
               })
               const payload:SuccessLogin|FailedLogin=await res.json()
               if('token' in payload){
               return {//built in object in next auth called user
                id:payload.user.email,
                user:payload.user,
                token:payload.token
               }
            }
            else{
                 throw new Error(payload.message)
            }
            }
        })
    ],
    callbacks:{
        jwt:({token,user})=>{
            if(user){
            token.user=user.user
            token.token=user.token
            }
            return token
        },
        session:({session,token})=>{
        session.user=token.user
        return session
        }
    },
    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET
}