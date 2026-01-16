import axios from 'axios';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentResult {
  id: number;
  body: string;
}

export async function safeFetchComment(commentId: number): Promise<CommentResult | null> {
  try {
    const response = await axios.get<Comment>(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    );

    return {
      id: response.data.id,
      body: response.data.body
    };
  } catch (error) {
    return null;
  }
}
﻿

 
 
 