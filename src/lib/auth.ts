import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { dbConnect } from "./db";
import User from "@/types/User";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function createSessionCookie(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await dbConnect();
    const user = await User.findById(decoded.userId).select("-password").lean();
    if (!user) return null;
    
    // Convert Mongoose _id to standard string for client use
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    return null;
  }
}
