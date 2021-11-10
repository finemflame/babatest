import { isEmpty } from 'lodash'
import {
  getAllCommonPostTypeData,
  getAllCommonPostTypeSlugs
} from '../lib/query'
import Layout from '../components/layout'
import Page from '../components/page'
import Posts from '../components/posts'
import Post from '../components/post'
import { FALLBACK } from '../config'

const SinglePage = ({ data }) => {
  return (
    <Layout data={data}>
      {data?.type === 'page' && <Page page={data?.pageData?.pageInfo} />}
      {data?.type === 'category' && (
        <Posts
          data={data?.pageData?.posts}
          title={data?.pageData?.pageInfo?.title}
        />
      )}
      {data.type === 'post' && <Post post={data?.pageData?.pageInfo} />}
    </Layout>
  )
}

export default SinglePage

export async function getStaticProps({ params }) {
  const response = await getAllCommonPostTypeData({ params })

  if (
    isEmpty(response) ||
    isEmpty(response.page.uri) ||
    isEmpty(response.page)
  ) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        type: response.type || {},
        menus: response.menus || {},
        siteMeta: response.meta || {},
        pageData: response.page || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const commonPostTypePaths = await getAllCommonPostTypeSlugs()

  return {
    paths: commonPostTypePaths || [],
    fallback: FALLBACK
  }
}
