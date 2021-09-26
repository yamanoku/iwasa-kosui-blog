import fs from 'fs';
import RSS from 'rss';
import { fetchAllPostsFromContentful } from '../lib/infra/post/contentful';
import { fetchAllPostsFromLocal } from '../lib/infra/post/local';
import { fetchLatestPostList } from '../lib/value/post';


export const getStaticProps = async () => {
    const xml = await generateFeedXml();
    await fs.writeFile(`${process.cwd()}/public/rss.xml`, xml, () => {});
    return {
        props: {},
    };
};

const Page = () => null;
export default Page;

async function generateFeedXml() {
    const feed = new RSS({
        title: "ebiebievidence.com",
        description: "ebiebievidence のブログ",
        site_url: "https://www.ebiebievidence.com",
        feed_url: "https://www.ebiebievidence.com/rss.xml",
        language: 'ja',
    });

    const posts = await fetchLatestPostList([fetchAllPostsFromLocal, fetchAllPostsFromContentful]);
    posts?.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            date: new Date(post.createdAt),
            url: `https://www.ebiebievidence.com/posts/${post.directory}/`,
        });
    })

    return feed.xml();
}
