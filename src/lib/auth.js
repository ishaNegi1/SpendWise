import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(user) {
  return jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function setTokenCookie(res, token) {
  res.headers.append(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure=${
      process.env.NODE_ENV === "production"
    }`
  );
}

export function clearTokenCookie(res) {
  res.headers.append(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
  );
}

export async function verifyToken() {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET); 
  } catch (err) {
    return null;
  }
}