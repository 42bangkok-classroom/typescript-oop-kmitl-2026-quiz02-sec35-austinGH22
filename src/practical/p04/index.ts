import axios from 'axios';


interface Comment {
  postId: number | null | undefined;
  id: number;
  name: string;
  email: string;
  body: string;
}
interface CommentCount {
  [key: number]: number;
}
export const countCommentsByPost = async (): Promise<CommentCount> => {
  try {
    const response = await axios.get<Comment[]>("https://jsonplaceholder.typicode.com/comments");
    const comments = response.data;
    const result = comments.reduce((acc, curr) => {
      const id = curr.postId; 
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as CommentCount);

    return result;

  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};