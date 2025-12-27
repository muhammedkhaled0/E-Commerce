"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Spinner from "@/components/Spinner"
import { registerApi } from "@/authServicesApi/registerApi"
import { useRouter } from "next/navigation"
import Link from "next/link"
const formSchema = z.object({
  name:z.string().nonempty('Name Is Required'),
  email:z.string().nonempty('Email Is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email must be a valid one'),
  password:z.string().nonempty('Password Is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password should coinatins a capital and small letters, spceial character,numbers and no less than 8 characters"),
  rePassword:z.string().nonempty('Password Is Required'),
  phone:z.string().nonempty('Phone Is Required').regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)
}).refine((data)=>data.password==data.rePassword,{path:['rePassword'],message:'RePassword must equal the Password'})
 

export default function Login() {
  const router = useRouter();
  const [isloading,setIsLoading]=useState<boolean>(false);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password:"",
      rePassword:"",
      phone:""
    },
  })
 
  // 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsLoading(true);

    await registerApi(
      values.name,
      values.email,
      values.password,
      values.rePassword,
      values.phone
    );

    router.push("/login");

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <>
<Card className="min-h-[75vh] w-full max-w-md mx-auto flex items-center justify-center flex-col p-6 shadow-lg rounded-xl my-15 border">
  <div className="flex items-center justify-center flex-col w-full">
    <h1 className="font-bold text-3xl mb-6 text-center">Register Now</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
       <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
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
          <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>RePassword</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
        <h1 className="text-center">Already have account?  <Link href={'/login'} className="text-blue-500">Sign In</Link></h1>
        <Button type="submit" className="w-full" disabled={isloading}>
          Submit  {isloading?<Spinner/>:''}
        </Button>
      </form>
    </Form>
  </div>
</Card>

    </>
  )
}
