import axios from "axios";

interface Post {
    id: number;
    title: string;
}

interface ApiPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
    try {
        const response = await axios.get<ApiPost[]>(
            "https://jsonplaceholder.typicode.com/posts"
        );

        const posts = response.data;

        return posts
            .filter((post: ApiPost) => post.userId === userId)
            .map((post: ApiPost) => ({
                id: post.id,
                title: post.title
            }));
    } catch (error) {
        throw error;
    }
}
