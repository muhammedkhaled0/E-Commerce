"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Spinner from "@/components/Spinner"
import { registerApi } from "@/authServicesApi/registerApi"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { resetPassword, sendResetEmail, verifyResetCode } from "@/authServicesApi/forgotPasswordApi"
const emailSchema = z.object({
  email:z.string().nonempty('Email Is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email must be a valid one'),
});

const codeSchema = z.object({
  resetCode: z.string().min(6, "Code must be 6 digits"),
});

const passwordSchema = z.object({
  newPassword:z.string().nonempty('Password Is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password should coinatins a capital and small letters, spceial character,numbers and no less than 8 characters"),

})

export default function page() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [msgStep1, setMsgStep1] = useState<string>('');
  const [msgStep2, setMsgStep2] = useState<string>('');
  const [email, setEmail] = useState(""); // <--- هنا نخزن الايميل
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      step === 1 ? emailSchema :
      step === 2 ? codeSchema :
      passwordSchema
    ),
  });
  async function onSubmit(values: any) {
    try {
      setIsLoading(true);

      if (step === 1) {
      const res=  await sendResetEmail(values.email);
      console.log(res);
      if(res.statusMsg=='success'){
        setEmail(values.email);
        setStep(2);
        form.reset();
      }
      else{
        setMsgStep1(res.message);
      }
      } else if (step === 2) {
        const res=await verifyResetCode(values.resetCode);
        if(res.status=='Success'){  
          setStep(3);
          form.reset();
        }
        else{
          setMsgStep2(res.message);
        }
      } else if (step === 3) {
        await resetPassword(email, values.newPassword); 
        router.push("/login");
      }

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
    <h1 className="font-bold text-3xl mb-6 text-center">
      {step === 1 && "Forgot Password?"}
      {step === 2 && "Verify Your Code"}
      {step === 3 && "Reset Password"}
    </h1>
    <p className="text-center text-gray-500 mb-6">
      {step === 1 && "Enter your email to receive the reset code"}
      {step === 2 && "Enter the code sent to your email"}
      {step === 3 && "Set your new password"}
    </p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">

        {step === 1 && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="user123@gmail.com"/>
                </FormControl>
                {msgStep1&&<h1 className="text-center  text-red-500">{msgStep1}</h1>}
              </FormItem>
            )}
          />
        )}

        {step === 2 && (
       <FormField
  control={form.control}
  name="resetCode"
  render={({ field }) => (
    <FormItem >
      <FormLabel className="text-center mx-auto">Verification Code</FormLabel>
      <FormControl>
        <InputOTP
          maxLength={6}
          pattern="\d*"
          {...field}
        >
          <InputOTPGroup className="mx-auto ">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <FormMessage />
            {msgStep2&&<h1 className="text-center  text-red-500">{msgStep2}</h1>}
    </FormItem>
  )}
/>
        )}
        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
        
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {step === 1 && "Send Code"}
          {step === 2 && "Verify Code"}
          {step === 3 && "Reset Password"}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </Form>
  </div>
</Card>


    </>
  )
}
