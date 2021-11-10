import { isEmpty } from 'lodash'
import Layout from '../../components/layout'
import Posts from '../../components/posts'
import { FALLBACK } from '../../config'
import { getAllTagPostsData, getAllTagSlugs } from '../../lib/query'

const SingleTag = ({ data }) => {
  return (
    <Layout data={data}>
      <Posts
        data={data?.pageData?.posts}
        title={data?.pageData?.pageInfo?.title}
      />
    </Layout>
  )
}

export default SingleTag

export async function getStaticProps({ params }) {
  const tagData = await getAllTagPostsData(params.slug)

  if (isEmpty(tagData) || isEmpty(tagData.page.uri) || isEmpty(tagData.page)) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        menus: tagData?.menus || {},
        siteMeta: tagData?.meta || {},
        pageData: tagData?.page || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const tagPaths = await getAllTagSlugs()

  return {
    paths: tagPaths || [],
    fallback: FALLBACK
  }
}
