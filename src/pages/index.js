import fetcher from '../lib/fetcher'
import { LATEST_POSTS, PAGE_BY_URI, ALL_MENUS, ALL_SITE_META } from '../lib/api'
import Layout from '../components/layout'
import Posts from '../components/posts'

const Home = ({ data }) => {
  return (
    <Layout data={data}>
      <Posts data={data?.latestPosts} title={data?.pageData?.title} isHome />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const variables = {
    uri: '/'
  }

  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)
  const latestPosts = await fetcher(LATEST_POSTS)
  const page = await fetcher(PAGE_BY_URI, { variables })

  return {
    props: {
      data: {
        menus: menus.data || {},
        siteMeta: meta.data || {},
        pageData: page.data || {},
        latestPosts: latestPosts.data || {}
      }
    },
    revalidate: 1
  }
}
