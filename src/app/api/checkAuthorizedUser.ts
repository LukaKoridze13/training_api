import jwt from "jsonwebtoken";
export interface I_User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export default async function checkAuthorizedUser(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  
  if (!token) {
    return null;
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET || "");
    return decodedPayload as I_User;
  } catch (error) {
    return null;
  }
}
