import { Post } from "../../value/post"

export const fetchPostPopularities = async (posts: Post[]) => {
    if (process.env.NODE_ENV === 'development') {
        return posts.map((post) => ({
            post,
            hatenaBookmark: Math.ceil(Math.random() * 20),
        })).sort((a, b) => b.hatenaBookmark - a.hatenaBookmark)
    }
    const postPopularities = await Promise.all(posts.map(async (post) => {
        try {
            const res = await fetch(`https://bookmark.hatenaapis.com/count/entry?url=https://www.ebiebievidence.com/posts/${post.directory}/`)
            const text = await res.text()
            return {
                post,
                hatenaBookmark: parseInt(text, 10),
            }
        } catch (error) {
            return {
                post,
                hatenaBookmark: 0
            }
        }
    }))
    return postPopularities
        .sort((a, b) => b.hatenaBookmark - a.hatenaBookmark)
}
