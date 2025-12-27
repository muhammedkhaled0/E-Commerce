import { NextResponse } from 'next/server'
import { getUserToken } from "@/app/Helpers/getUserToken"
export async function GET() {
  const token = await getUserToken()
  return NextResponse.json({ token: token || '' })
}