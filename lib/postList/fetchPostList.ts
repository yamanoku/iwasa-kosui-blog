export interface PostListItem {
    source: 'file' | 'contentful'
    title: string
    href: string
    description: string
    dirs: string[]
    createdAt: number
    tags?: string[]
    ogpImageSrc?: string
}

export type PostListItemFetcher = () => Promise<{ posts: PostListItem[] }>

export const fetchLatestPostListItem = async (fetchers: PostListItemFetcher[]) => {
    const postGroups = await Promise.all(fetchers.map(fetcher => fetcher()))

    return postGroups
        .reduce<PostListItem[]>((prev, cur) => {
            return prev.concat(cur.posts)
        }, [])
        .sort((a, b) => b.createdAt - a.createdAt)
}

export const fetchPopularPostListItem = async (fetchers: PostListItemFetcher[]) => {
    const postGroups = await Promise.all(fetchers.map(fetcher => fetcher()))

    return postGroups
        .reduce<PostListItem[]>((prev, cur) => {
            return prev.concat(cur.posts)
        }, [])
        .sort((a, b) => b.createdAt - a.createdAt)
}

export const fetchPostsFromMock: PostListItemFetcher = async () => {
    return {
        posts: [
            {
                source: 'file',
                title: 'yo',
                description: 'ya',
                dirs: ['2021', '03', 'env'],
                href: '/posts/2021/03/env',
                createdAt: 123
            },
        ]
    }
}
