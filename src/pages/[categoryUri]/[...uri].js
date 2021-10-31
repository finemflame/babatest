import fetcher from '../../lib/fetcher'
import {
  ALL_POSTS,
  POST_BY_SLUG,
  ALL_MENUS,
  ALL_SITE_META
} from '../../lib/api'
import Layout from '../../components/layout'
import Post from '../../components/post'
// import { includesPageUri } from '../../../utils/helpers'
import { FALLBACK } from '../../config'

// TODO
// Fix: Clicking on a sub category also leads here...

const SinglePost = ({ data }) => {
  return (
    <Layout data={data}>
      <Post post={data?.pageData?.post} />
    </Layout>
  )
}

export default SinglePost

export async function getStaticProps({ params }) {
  const postUriArr = params?.uri
  postUriArr.unshift(params?.categoryUri)

  const variables = {
    uri: postUriArr.join('/')
  }

  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)
  const post = await fetcher(POST_BY_SLUG, { variables })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        menus: menus.data || {},
        siteMeta: meta.data || {},
        pageData: post.data || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const response = await fetcher(ALL_POSTS)

  const allPosts = response?.data?.posts?.nodes

  const paths = []

  allPosts.map(post => {
    const uris = post?.uri.split('/').filter(postUri => postUri)
    paths.push({
      params: { categoryUri: uris.shift(), uri: uris }
    })
  })

  return {
    paths: paths || [],
    fallback: FALLBACK
  }
}
