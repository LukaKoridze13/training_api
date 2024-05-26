import ConnectMongo from "@/mongo/ConnectMongo";
import UserModel from "@/mongo/models/UserModel";
import getMessages from "../getMessages";
import checkRefresh from "../checkRefresh";
import jwt from "jsonwebtoken";
import API_CONFIG from "@/config/API_CONFIG";

export async function GET(req: Request) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkRefresh(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }
    const foundUser = await UserModel.findOne({ _id: user._id }).select("-password");
    const payload = JSON.parse(JSON.stringify(foundUser));
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: API_CONFIG.accessTokenExpiration });
    const expiresIn = API_CONFIG.accessTokenExpiration;
    return Response.json({ message: messages.success, accessToken, expiresIn }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
