import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export function createToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export async function verifyToken(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const parsedCookies = cookie.parse(cookieHeader);
    const token = parsedCookies.token;
    if (!token) return null;

    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded);
      });
    });
  } catch {
    return null;
  }
}

export function setTokenCookie(res, token) {
  res.headers.append(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );
}

export function clearTokenCookie(res) {
  res.headers.append(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    })
  );
}
