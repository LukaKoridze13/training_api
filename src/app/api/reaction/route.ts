import ConnectMongo from "@/mongo/ConnectMongo";
import checkAuthorizedUser from "../checkAuthorizedUser";
import getMessages from "../getMessages";
import ReactionModel from "@/mongo/models/ReactionModel";
import PostModel from "@/mongo/models/PostModel";

interface I_CreateReaction {
  postId: string;
  reaction: "like" | "dislike";
}

export async function POST(req: Request) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }

    const body = (await req.json()) as I_CreateReaction;
    const { postId, reaction } = body;

    if (!postId || !reaction) {
      return Response.json({ error: messages.all_fields_required + " postId, reaction." }, { status: 400 });
    }

    if (reaction !== "like" && reaction !== "dislike") {
      return Response.json({ error: "Invalid Reaction" }, { status: 400 });
    }

    const postExists = await PostModel.exists({ _id: postId });
    if(!postExists){
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const existingReaction = await ReactionModel.findOne({ user: user._id, post: postId });
    if (existingReaction) {
      existingReaction.reaction = reaction;
      await existingReaction.save();
      return Response.json({ message: messages.success }, { status: 200 });
    }

    const newReaction = new ReactionModel({
      user: user._id,
      post: postId,
      reaction,
    });

    await newReaction.save();
    return Response.json({ message: messages.success }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
