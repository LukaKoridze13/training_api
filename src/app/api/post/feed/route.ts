import ConnectMongo from "@/mongo/ConnectMongo";
import PostModel from "@/mongo/models/PostModel";
import ReactionModel from "@/mongo/models/ReactionModel";
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

    const postsWithReactions = await Promise.all(
      posts.map(async (post) => {
        const postId = post._id;
        const likesCount = await ReactionModel.countDocuments({ post: postId, reaction: "like" });
        const dislikesCount = await ReactionModel.countDocuments({ post: postId, reaction: "dislike" });

        return {
          ...post.toObject(),
          likes: likesCount,
          dislikes: dislikesCount,
        };
      })
    );

    return Response.json({ posts: postsWithReactions, totalPages, currentPage: page, perPage }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: messages.internal_server_error }, { status: 500 });
  }
}
