import fetcher from '../src/lib/fetcher'
import { isEmpty } from 'lodash'
import {
  ALL_PAGES_URI,
  PAGE_BY_URI,
  ALL_MENUS,
  ALL_CATEGORIES,
  CATEGORY_BY_URI,
  POSTS_BY_CATEGORY_ID,
  ALL_SITE_META
} from '../src/lib/api'
import Layout from '../src/components/layout'
import Page from '../src/components/page'
import Posts from '../src/components/posts'
import { includesPageUri } from '../src/utils/helpers'
import { FALLBACK } from '../src/config'

// TODO
// Clicking sub categories goes to [categoryUri]/[...uri].js
// should come here rather...

const SinglePage = ({ data }) => {
  if (data.isPage) {
    return (
      <Layout data={data}>
        <Page page={data?.pageData?.page} />
      </Layout>
    )
  }

  return (
    <Layout data={data}>
      <Posts data={data?.postsData} title={data?.pageData?.category?.title} />
    </Layout>
  )
}

export default SinglePage

export async function getStaticProps({ params }) {
  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)

  let variables = {
    uri: params?.uri.join('/')
  }

  let page = await fetcher(PAGE_BY_URI, { variables })

  if (page.errors) {
    page = await fetcher(CATEGORY_BY_URI, { variables })

    const categoryId = page?.data?.category?.databaseId
    variables = {
      categoryId: categoryId
    }
    const posts = await fetcher(POSTS_BY_CATEGORY_ID, { variables })

    if (isEmpty(posts.data)) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        data: {
          isPage: false,
          menus: menus.data || {},
          siteMeta: meta.data || {},
          pageData: page.data || {},
          postsData: posts.data || {}
        }
      },
      revalidate: 1
    }
  }

  if (page.data.page === null) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        isPage: true,
        menus: menus.data || {},
        siteMeta: meta.data || {},
        pageData: page.data || {},
        postsData: {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const catResponse = await fetcher(ALL_CATEGORIES)
  const allCategories = catResponse?.data?.categories?.edges

  const pageResponse = await fetcher(ALL_PAGES_URI)
  const allPages = pageResponse?.data?.pages?.edges

  const paths = []

  allCategories.map(category => {
    const uris = category?.node?.uri.split('/').filter(catUri => catUri)
    paths.push({ params: { uri: uris } })
  })

  allPages &&
    allPages.map(page => {
      if (!includesPageUri(page?.node?.uri)) {
        const uris = page?.node?.uri.split('/').filter(pageUri => pageUri)
        paths.push({ params: { uri: uris } })
      }
    })

  return {
    paths: paths || [],
    fallback: FALLBACK
  }
}
