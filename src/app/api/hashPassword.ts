import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}
