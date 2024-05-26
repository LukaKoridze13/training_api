import ConnectMongo from "@/mongo/ConnectMongo";
import PostModel, { D_Post } from "@/mongo/models/PostModel";
import checkAuthorizedUser from "../../checkAuthorizedUser";
import getMessages from "../../getMessages";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();

    const postId = params.id;
    const post = await PostModel.findById(postId).populate("author", "-password");
    if (!post) {
      return Response.json({ error: messages.not_found }, { status: 404 });
    }

    return Response.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}

interface I_UpdatePost {
  title?: string;
  content?: string;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }

    const body = (await req.json()) as I_UpdatePost;
    const { title, content } = body;

    if (!title && !content) {
      return Response.json({ error: messages.all_fields_required }, { status: 400 });
    }

    const postId = params.id;
    const post = await PostModel.findById<D_Post>(postId).populate("author", "-password");

    if (!post) {
      return Response.json({ error: messages.not_found }, { status: 404 });
    }

    if (post.author._id?.toString() !== user._id.toString()) {
      return Response.json({ error: messages.forbidden }, { status: 403 });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    return Response.json({ message: messages.success, post }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }

    const postId = params.id;
    const post = await PostModel.findById(postId);

    if (!post) {
      return Response.json({ error: messages.not_found }, { status: 404 });
    }

    if (post.author.toString() !== user._id.toString()) {
      return Response.json({ error: messages.forbidden }, { status: 403 });
    }

    await PostModel.deleteOne({ _id: postId });

    return Response.json({ message: messages.success }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
