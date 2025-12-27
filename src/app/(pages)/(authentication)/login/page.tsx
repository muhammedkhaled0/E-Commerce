"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {signIn} from "next-auth/react"
import { useState } from "react"
import Spinner from "@/components/Spinner"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
const formSchema = z.object({
 email:z.string().nonempty('Email Is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email must be a valid one'),
  password:z.string().nonempty('Password Is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password should coinatins a capital and small letters, spceial character,numbers and no less than 8 characters"),
})
 

export default function Login() {
  let searchParams=useSearchParams();
  const [isloading,setIsLoading]=useState<boolean>(false);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const res= await signIn('credentials',{
      email:values.email,
      password:values.password,
      callbackUrl:'/products',
      redirect:true
    })
    setIsLoading(false);
  }
  return (
<Card className="min-h-[75vh] w-full max-w-md mx-auto flex items-center justify-center flex-col p-6 shadow-lg rounded-xl my-15 border">
  <div className="flex items-center justify-center flex-col w-full">
    <h1 className="font-bold text-3xl mb-6 text-center">Login Now</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none " placeholder="user123@gmail.com" />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
        <h1 className="text-center">Don't have an account?  <Link href={'/register'} className="text-blue-500">Register</Link></h1>
        <h1 className="text-center"><Link href={'/forgot-password'} className="text-blue-500">Forgot password?</Link></h1>
        <h2 className="text-red-600 text-xl text-center">{searchParams.get('error')}</h2>
        <Button type="submit" className="w-full" disabled={isloading}>
          Submit  {isloading?<Spinner/>:''}
        </Button>
      </form>
    </Form>
  </div>
</Card>
  )
}
