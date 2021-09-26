import { GetStaticProps, NextPage } from "next"
import Head from 'next/head'
import NextLink from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    HatenaShareButton,
    HatenaIcon,
} from 'react-share'
import styled from "@emotion/styled"
import { FaGithub, FaRss, FaTwitter } from "react-icons/fa"
import { fetchAllPostsFromLocal, fetchPostFromLocal } from "../../../lib/infra/post/local"
import { fetchLatestPostList, Post } from "../../../lib/value/post"
import Background from "../../../components/Background"
import Container from "../../../components/Container"
import Code from "../../../components/Code"
import Info from "../../../components/Info"
import CodeHead from "../../../components/CodeHead"

type Props = {
    source: MDXRemoteSerializeResult<Record<string, unknown>>
    post: Post
}

const components = {
    code: Code,
    Info,
    CodeHead
}

const DateDiv = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: #777;
    margin: 16px 0;
    display: block;
`

const IconLink = styled.a`
    box-shadow: none;
    margin: 0 8px 0 0;
    color: #333;
    font-size: 1.2rem;
`

const PostPage: NextPage<Props> = ({ source, post }) => {
    const postUrl = `https://www.ebiebievidence.com/posts/${post.directory}/`
    return (
        <Background>
        
            <Head>
                <title>{post.title} | ebiebievidence.com</title>
                <meta name="description" content="ebiebievidence.com" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Container style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <NextLink href="/">
                    <a>
                        <h1 style={{ fontSize: '1.2rem' }}>ebiebievidence.com</h1>
                    </a>
                </NextLink>
                <div>
                    <IconLink href="https://twitter.com/ebiebievidence" target="_blank"><FaTwitter /></IconLink>
                    <IconLink href="https://github.com/iwasa-kosui" target="_blank"><FaGithub /></IconLink>
                    <IconLink href="/rss.xml" target="_blank"><FaRss /></IconLink>
                </div>
            </Container>
            <Container className='post' style={{ background: 'white', padding: 32, borderRadius: 8 }}>
                <h1 style={{ textAlign: 'center' }}>{post.title}</h1>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <DateDiv> {new Date(post.createdAt).toLocaleDateString('ja-JP')} </DateDiv>
                    <div>
                        <FacebookShareButton url={postUrl}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            title={post.title}
                            via="ebiebievidence"
                            url={postUrl}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <HatenaShareButton url={postUrl} title={post.title}>
                            <HatenaIcon size={32} round />
                        </HatenaShareButton>
                    </div>
                </div>
                <MDXRemote {...source} components={components} />
            </Container>
        </Background>
    )
}

export default PostPage

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const params = context.params ?? {}
    const dirs: string[] = typeof params['dirs'] === 'string' ? [] : params['dirs'] ?? []
    const post = await fetchPostFromLocal(dirs.join('/'))
    const source = post.content
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource, post } }
}

export async function getStaticPaths() {
    const posts = await fetchLatestPostList([fetchAllPostsFromLocal])
    const paths = posts.map((post) => ({
        params: { dirs: post.directory.split('/') },
    }))
    return { paths: paths, fallback: false }
}
