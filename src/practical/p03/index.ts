// export function mapPostWithCommentCount() {}
import axios from "axios";


interface Post {
  id: number;
  title: string;
}

interface Comment {
  postId: number;
}

interface PostWithCommentCount {
  postId: number;
  title: string;
  totalComments: number;
}


export async function mapPostWithCommentCount(): Promise<PostWithCommentCount[]> {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts"),
      axios.get<Comment[]>("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const posts = postsRes.data;
    const comments = commentsRes.data;


    if (posts.length === 0) {
      return [];
    }


    const commentCountMap = comments.reduce<Record<number, number>>(
      (acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      },
      {}
    );

    return posts.map((post) => ({
      postId: post.id,
      title: post.title,
      totalComments: commentCountMap[post.id] ?? 0,
    }));
  } catch (error) {
    throw error;
  }
}
