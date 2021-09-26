import fs from 'fs'
import { join, relative } from 'path'
import matter from 'gray-matter'
import { Post, PostFetcher, PostListFetcher } from '../../value/post'

const postsLocalDirectory = join(process.cwd(), '_posts')

const ensureString = (val: any) => {
    if (typeof val === 'string') {
        return val
    }
    return ''
}

export const fetchPostFromLocal: PostFetcher = async (directory: string) => {
    const path = join(postsLocalDirectory, directory, 'index.md')
    const fileContents = fs.readFileSync(path, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        source: 'local',
        title: ensureString(data['title']),
        directory,
        description: ensureString(data['desc']),
        content,
        createdAt: Date.parse(ensureString(data['date'])),
        tags: ensureString(data['tags']).split(','),
        image: ensureString(data['image']),
    }
}

const readdirRecursively = async (root: string) => {
    const entries = await fs.promises.readdir(root, { withFileTypes: true })
    let dirs: string[] = []
    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue
        }

        try {
            fs.lstatSync(join(root, entry.name, 'index.md'), {throwIfNoEntry: true})
            dirs.push(join(root, entry.name))
        } catch (error) {
            dirs = dirs.concat(await readdirRecursively(join(root, entry.name)))
        }
    }
    return dirs
}

export const fetchAllPostsFromLocal: PostListFetcher = async () => {
    const absDirs = await readdirRecursively(postsLocalDirectory)
    console.log(absDirs)
    const dirs = absDirs.map(absDir => relative(postsLocalDirectory, absDir))
    const posts = await Promise.all(dirs.map((dir) => {
        try {
            return fetchPostFromLocal(dir)
        } catch (error) {
            return undefined
        }
    }).filter(post => post != null))

    const ret: Post[] = []
    for (const post of posts) {
        if (post != null) {
            ret.push(post)
        }
    }
    return ret
}