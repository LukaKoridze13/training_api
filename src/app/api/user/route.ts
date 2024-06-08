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

    const errors: { [key: string]: string } = {};

    if (!name) errors.name = messages.all_fields_required + " name";
    if (!surname) errors.surname = messages.all_fields_required + " surname";
    if (!email) errors.email = messages.all_fields_required + " email";
    if (!password) errors.password = messages.all_fields_required + " password";
    if (!repeat_password) errors.repeat_password = messages.all_fields_required + " repeat_password";

    if (name && name.length < 2) errors.name = messages.min;
    if (surname && surname.length < 2) errors.surname = messages.min;
    if (password && password.length < 6) errors.password = messages.min6;
    if (password !== repeat_password) errors.repeat_password = messages.passwords_do_not_match;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailRegex.test(email)) errors.email = messages.invalid_email;

    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      errors.email = messages.email_used;
      return Response.json({ errors }, { status: 400 });
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
