import { isEmpty } from 'lodash'
import { getAllPageData, getAllPagePaths } from '../lib/query'
import Layout from '../components/layout'
import Page from '../components/page'
import { FALLBACK } from '../config'

const SinglePage = ({ data }) => {
  console.log('...slug: ', data)
  return (
    <Layout data={data}>
      <Page page={data?.pageData?.page} />
    </Layout>
  )
}

export default SinglePage

export async function getStaticProps({ params }) {
  const response = await getAllPageData({ params })
  console.log('pagedata: ', response)
  if (
    isEmpty(response) ||
    isEmpty(response.page.uri) ||
    isEmpty(response.page.page)
  ) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        menus: response.menus || {},
        siteMeta: response.meta || {},
        pageData: response.page || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const pagesPathsData = await getAllPagePaths()

  return {
    paths: pagesPathsData || [],
    fallback: FALLBACK
  }
}
