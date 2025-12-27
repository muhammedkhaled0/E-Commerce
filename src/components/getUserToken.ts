import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getServerAccessToken() {
  const token = cookies().get("next-auth.session.token")?.value;
  if (!token) return null;

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.accessToken as string | null;
}
