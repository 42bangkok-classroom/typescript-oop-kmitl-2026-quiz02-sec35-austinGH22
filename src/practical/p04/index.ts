// export function countCommentsByPost() {}

import axios from "axios";

interface Comment {
  postId?: number | null;
}

type CommentCountMap = Record<number, number>;

async function countCommentsByPost(): Promise<CommentCountMap> {
  try {
    const response = await axios.get<Comment[]>(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const comments = response.data;

    if (!Array.isArray(comments) || comments.length === 0) {
      return {};
    }

    return comments.reduce<CommentCountMap>((acc, comment) => {
      if (typeof comment.postId !== "number") {
        return acc;
      }

      acc[comment.postId] = (acc[comment.postId] ?? 0) + 1;
      return acc;
    }, {});
  } catch {
    return {};
  }
}
