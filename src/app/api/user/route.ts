import UserModel from "@/mongo/models/UserModel";
import getMessages from "../getMessages";
import ConnectMongo from "@/mongo/ConnectMongo";
import { hashPassword } from "../hashPassword";
import checkAuthorizedUser from "../checkAuthorizedUser";

interface I_CreateUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeat_password: string;
}

export async function GET(req: Request) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }
    const foundUser = await UserModel.findOne({ _id: user._id }).select("-password");
    return Response.json(foundUser, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const messages = getMessages(req);

  try {
    await ConnectMongo();
    const body = (await req.json()) as I_CreateUser;
    const { name, surname, email, password, repeat_password } = body;

    if (!name || !surname || !email || !password || !repeat_password) {
      return Response.json({ error: messages.all_fields_required + " name, surname, email, password, repeat_password" }, { status: 400 });
    }

    if (name.length < 2) {
      return Response.json({ errors: { name: messages.min } }, { status: 400 });
    }

    if (surname.length < 2) {
      return Response.json({ errors: { surname: messages.min } }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ errors: { password: messages.min6 } }, { status: 400 });
    }

    if (password !== repeat_password) {
      return Response.json({ errors: { repeat_password: messages.passwords_do_not_match } }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return Response.json({ errors: { email: messages.invalid_email } }, { status: 400 });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return Response.json({ errors: { email: messages.email_used } }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = new UserModel({ name, surname, email, password: hashedPassword });
    await user.save();
    return Response.json({ message: messages.user_created }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
