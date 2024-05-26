import ConnectMongo from "@/mongo/ConnectMongo";
import PostModel from "@/mongo/models/PostModel";
import getMessages from "../../getMessages";

export async function GET(req: Request) {
  const messages = getMessages(req);
  try {
    await ConnectMongo();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const perPage = parseInt(url.searchParams.get("perPage") || "15");

    const skip = (page - 1) * perPage;
    const posts = await PostModel.find().populate("author", "-password").skip(skip).limit(perPage).sort({ createdAt: -1 });

    const totalPosts = await PostModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    return Response.json({ posts, totalPages, currentPage: page, perPage }, { status: 200 });
  } catch (error) {
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
