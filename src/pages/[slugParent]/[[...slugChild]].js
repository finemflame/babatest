import { isEmpty } from 'lodash'
import {
  getAllCategoryPostData,
  getAllCategoryPostSlugs
} from '../../lib/query'
import { FALLBACK } from '../../config'
import Layout from '../../components/layout'
import Posts from '../../components/posts'
import Post from '../../components/post'

const CategoryView = ({ data }) => {
  return (
    <Layout data={data}>
      {data.postType === 'category' && (
        <Posts
          data={data?.pageData?.posts}
          title={data?.pageData?.category?.title}
        />
      )}
      {data.postType === 'post' && <Post post={data?.pageData?.post} />}
    </Layout>
  )
}

export default CategoryView

export async function getStaticProps({ params }) {
  const response = await getAllCategoryPostData({ params })

  if (
    isEmpty(response) ||
    (isEmpty(response.page.category) && isEmpty(response.page.post)) ||
    response.type === 'page' ||
    isEmpty(response.page.category.uri)
  ) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data: {
        postType: response.type || {},
        menus: response.menus || {},
        siteMeta: response.meta || {},
        pageData: response.page || {}
      }
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const catsPathsData = await getAllCategoryPostSlugs()

  return {
    paths: catsPathsData || [],
    fallback: FALLBACK
  }
}
