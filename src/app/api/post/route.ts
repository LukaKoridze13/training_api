import ConnectMongo from "@/mongo/ConnectMongo";
import checkAuthorizedUser from "../checkAuthorizedUser";
import getMessages from "../getMessages";
import PostModel from "@/mongo/models/PostModel";

interface I_CreatePost {
  title: string;
  content: string;
}

export async function POST(req: Request) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }

    const body = (await req.json()) as I_CreatePost;
    const { title, content } = body;

    if (!title || !content) {
      return Response.json({ error: messages.all_fields_required + " title, content." }, { status: 400 });
    }

    if (title.trim() === "") {
      return Response.json({ error: messages.invalid_title }, { status: 400 });
    }

    if (content.trim() === "") {
      return Response.json({ error: messages.invalid_content }, { status: 400 });
    }

    const newPost = new PostModel({
      title,
      content,
      author: user._id,
    });

    await newPost.save();
    const post = await PostModel.findOne({ _id: newPost._id }).populate("author", "-password");
    return Response.json({ message: messages.success, post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
