import fetcher from '../../src/lib/fetcher'
import { isEmpty } from 'lodash'
import {
  ALL_TAGS,
  ALL_MENUS,
  POSTS_BY_TAG_ID,
  TAG_BY_SLUG,
  ALL_SITE_META
} from '../../src/lib/api'
import Layout from '../../src/components/layout'
import Posts from '../../src/components/posts'
import { FALLBACK } from '../../src/config'

const SingleTag = ({ data }) => {
  return (
    <Layout data={data}>
      <Posts data={data?.postData} title={data?.pageData?.tag?.title} />
    </Layout>
  )
}

export default SingleTag

export async function getStaticProps({ params }) {
  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)

  let variables = {
    // uri: params?.uri.join('/')
    slug: params?.slug
  }
  const tag = await fetcher(TAG_BY_SLUG, { variables })

  if (tag.data.tag === null) {
    return {
      notFound: true
    }
  }

  variables = {
    tagId: tag?.data?.tag?.id
  }

  const posts = await fetcher(POSTS_BY_TAG_ID, { variables })

  if (isEmpty(posts.data)) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        menus: menus.data || {},
        siteMeta: meta.data || {},
        pageData: tag.data || {},
        postData: posts.data || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const response = await fetcher(ALL_TAGS)

  const allTags = response?.data?.tags?.edges

  const paths = allTags.map(tag => {
    return { params: { slug: tag?.node?.slug } }
  })

  return {
    paths: paths || [],
    fallback: FALLBACK
  }
}
