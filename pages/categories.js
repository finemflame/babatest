import fetcher from '../src/lib/fetcher'
import { ALL_CATEGORIES, ALL_MENUS, ALL_SITE_META } from '../src/lib/api'
import Layout from '../src/components/layout'
import AllCategories from '../src/components/allCategories'

const Categories = ({ data }) => {
  return (
    <>
      <Layout data={data}>
        <AllCategories categories={data?.categoriesData?.categories} />
      </Layout>
    </>
  )
}

export default Categories

export async function getStaticProps() {
  const categories = await fetcher(ALL_CATEGORIES)
  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)

  return {
    props: {
      data: {
        categoriesData: categories.data || {},
        menus: menus.data || {},
        siteMeta: meta.data || {}
      }
    },
    revalidate: 1
  }
}
