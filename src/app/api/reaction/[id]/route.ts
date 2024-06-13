import ConnectMongo from "@/mongo/ConnectMongo";
import checkAuthorizedUser from "../../checkAuthorizedUser";
import getMessages from "../../getMessages";
import ReactionModel from "@/mongo/models/ReactionModel";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const user = await checkAuthorizedUser(req);
    if (!user) {
      return Response.json({ error: messages.unauthorized }, { status: 401 });
    }

    const reactionId = params.id;
    const reaction = await ReactionModel.findById(reactionId);

    if (!reaction) {
      return Response.json({ error: messages.not_found }, { status: 404 });
    }

    if (reaction.user.toString() !== user._id.toString()) {
      return Response.json({ error: messages.forbidden }, { status: 403 });
    }

    await ReactionModel.deleteOne({ _id: reactionId });

    return Response.json({ message: messages.success }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
