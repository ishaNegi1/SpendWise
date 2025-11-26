import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function checkAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
