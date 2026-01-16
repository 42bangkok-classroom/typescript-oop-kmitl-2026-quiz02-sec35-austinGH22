import axios from "axios";

type CommentResponse = {
  id: number;
  body: string;
};

async function safeFetchComment(
  commentId: number | null | undefined
): Promise<CommentResponse | null> {

  if (typeof commentId !== "number" || commentId <= 0) {
    return null;
  }

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    );

    const data = response.data as {
      id?: number;
      body?: string;
    };

    if (typeof data.id !== "number" || typeof data.body !== "string") {
      return null;
    }
    const { id, body } = data;

    return { id, body };
  } catch {
    return null;
  }
}
