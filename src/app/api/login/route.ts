import UserModel, { D_User } from "@/mongo/models/UserModel";
import getMessages from "../getMessages";
import ConnectMongo from "@/mongo/ConnectMongo";
import jwt from "jsonwebtoken";
import API_CONFIG from "@/config/API_CONFIG";
import bcrypt from "bcrypt";

interface I_Login {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const messages = getMessages(req);

  try {
    await ConnectMongo();
    const body = (await req.json()) as I_Login;
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: messages.all_fields_required + " email, password" }, { status: 400 });
    }

    const user = await UserModel.findOne<D_User>({ email });
    if (!user) {
      return Response.json({ error: messages.invalid_credentials }, { status: 400 });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return Response.json({ error: messages.invalid_credentials }, { status: 400 });
    }
    const payload = JSON.parse(JSON.stringify(user));
    delete payload.password;

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: API_CONFIG.accessTokenExpiration });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH || "", { expiresIn: "365d" });
    const expiresIn = API_CONFIG.accessTokenExpiration;

    return Response.json({ message: messages.success, accessToken, refreshToken, expiresIn }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
