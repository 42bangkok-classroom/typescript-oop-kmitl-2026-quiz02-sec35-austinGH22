import axios from "axios";

interface Post {
  id: number;
  title: string;
}

export async function getEdgePosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const posts = response.data;

    if (posts.length === 0) return [];

    if (posts.length === 1) {
      return [
        { id: posts[0].id, title: posts[0].title },
        { id: posts[0].id, title: posts[0].title }
      ];
    }

    const firstPost = posts[0];
    const lastPost = posts[posts.length - 1];

    return [
      { id: firstPost.id, title: firstPost.title },
      { id: lastPost.id, title: lastPost.title }
    ];
  } catch (error) {
    throw error;
  }
}
