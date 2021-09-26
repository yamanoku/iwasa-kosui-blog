import { createClient } from 'contentful';
import { PostFetcher, PostListFetcher } from '../../value/post';

const client = createClient({
    space: process.env.CF_SPACE_ID ?? '', // ID of a Compose-compatible space to be used \
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN ?? '', // delivery API key for the space \
});

const ensureString = (val: any) => {
    if (typeof val === 'string') {
        return val
    }
    return ''
}

export const fetchAllPostsFromContentful: PostListFetcher = async () => {
    const query = {
        limit: 1000,
        content_type: 'blogPost',
    };
    const res = await client.getEntries<{
        title: string
        description: string
        directory: string
        body: string
    }>(query);
    return res.items.map(item => ({
        source: 'contentful',
        title: ensureString(item.fields['title']),
        description: ensureString(item.fields['description']),
        directory: ensureString(item.fields['directory']),
        content: ensureString(item.fields['body']),
        createdAt: Date.parse(ensureString(item.sys.createdAt)),
        tags: [],
    }))
}

export const fetchPostFromContentful: PostFetcher = async (directory: string) => {
    const query = {
        limit: 1,
        content_type: 'blogPost',
        "fields.directory": directory,
    };
    const res = await client.getEntries<{
        title: string
        description: string
        directory: string
        body: string
    }>(query);
    if (res.items.length === 0) {
        throw new Error("Not Found");
    }
    return {
        source: 'contentful',
        title: ensureString(res.items[0].fields['title']),
        description: ensureString(res.items[0].fields['description']),
        directory: ensureString(res.items[0].fields['directory']),
        content: ensureString(res.items[0].fields['body']),
        createdAt: Date.parse(ensureString(res.items[0].sys.createdAt)),
        tags: [],
    }
}
