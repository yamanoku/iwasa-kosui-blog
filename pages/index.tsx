import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { fetchLatestPostList, Post } from '../lib/value/post'
import { FaTwitter, FaGithub, FaRss } from 'react-icons/fa'
import { fetchAllPostsFromLocal } from '../lib/infra/post/local'
import Background from '../components/Background'
import Container from '../components/Container'
import { PostPopularity } from '../lib/value/popularity'
import { fetchPostPopularities } from '../lib/infra/popularity/popularity'
import { fetchAllPostsFromContentful } from '../lib/infra/post/contentful'

type Props = { latest: Post[], popular: PostPopularity[] }

const Title = styled.h1`
    font-size: 2rem;
`

const Section = styled.section`
    margin: 48px 0;
`

const P = styled.p`
    line-height: 2rem;
    margin: 16px 0 24px;
`

const IconLink = styled.a`
    box-shadow: none;
    margin: 0 8px 0 0;
    color: #333;
    font-size: 1.2rem;
`

const TagContainer = styled.div`
    margin: 16px 0 0;
`

const Tag = styled.span`
    padding: 4px 8px;
    border-radius: 4px;
    margin: 0 8px 0 0;
    background: #eee;
`

const PostItem = ({post}: {post: Post}) => (
    <Link href={`/posts/${post.directory}`}>
        <a style={{display: 'block', margin: '0 0 24px', padding: 16, borderRadius: 8, background: 'white'}}>
            <h3 style={{margin: '0 0 8px'}}>{post.title}</h3>
            <p style={{margin: '0'}}>{post.description}</p>
            <TagContainer>
            {
                post.tags?.map(tag => (<Tag key={tag}>{tag}</Tag>))
            }
            </TagContainer>
        </a>
    </Link>
)


const PostPopularityItem = ({postPopularity}: {postPopularity: PostPopularity}) => (
    <Link href={`/posts/${postPopularity.post.directory}`}>
        <a style={{display: 'block', margin: '0 0 24px', padding: 16, borderRadius: 8, background: 'white'}}>
            <h3 style={{margin: '0 0 8px'}}>{postPopularity.post.title}</h3>
            <p style={{margin: '0 0 8px'}}>{postPopularity.post.description}</p>
            <p style={{margin: '0'}}><b style={{fontSize: '1.1rem'}}>{postPopularity.hatenaBookmark}</b> users</p>
        </a>
    </Link>
)

const Home: NextPage<Props> = ({ latest, popular }) => {
    return (
        <Background>
            <Container>
                <Head>
                    <title>ebiebievidence.com</title>
                    <meta name="description" content="ebiebievidence.com" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                
                <main>
                    <Section style={{margin: '96px 0'}}>
                        <Title>ebiebievidence.com</Title>
                        <P>Web に関する話をつらつらと</P>
                        <IconLink href="https://twitter.com/ebiebievidence" target="_blank"><FaTwitter/></IconLink>
                        <IconLink href="https://github.com/iwasa-kosui" target="_blank"><FaGithub/></IconLink>
                        <IconLink href="/rss.xml" target="_blank"><FaRss/></IconLink>
                    </Section>
                    <Section>
                        <h2>人気の記事</h2>
                        <p style={{color: '#666'}}>はてなブックマークでのブクマ数より算出</p>
                        {
                            popular.map(postPopularity => (
                                <PostPopularityItem key={postPopularity.post.directory} postPopularity={postPopularity} />
                            ))
                        }
                    </Section>
                    <Section>
                        <h2>すべての記事</h2>
                        {
                            latest.map(post => (
                                <PostItem key={post.directory} post={post} />
                            ))
                        }
                    </Section>
                </main>
            </Container>
        </Background>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const latestPosts = await fetchLatestPostList([fetchAllPostsFromLocal, fetchAllPostsFromContentful])
    const popularities = await fetchPostPopularities(latestPosts)
    return {
        props: {
            latest: latestPosts,
            popular: popularities.slice(0, 3),
        }
    }
}

export default Home
