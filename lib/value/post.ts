export type PostSourceType = 'local' | 'contentful'

export interface Post {
    source: PostSourceType
    title: string
    directory: string
    description: string
    content: string
    createdAt: number
    tags?: string[]
    image?: string
}

export type PostListFetcher = () => Promise<Post[]>

export type PostFetcher = (directory: string) => Promise<Post>

export const fetchLatestPostList = async (fetchers: PostListFetcher[]) => {
    const postGroups = await Promise.all(fetchers.map(fetcher => fetcher()))

    return postGroups
        .reduce<Post[]>((prev, cur) => {
            return prev.concat(cur)
        }, [])
        .sort((a, b) => b.createdAt - a.createdAt)
}
