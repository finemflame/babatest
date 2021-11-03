import PageHeader from './pageHeader'
import PageBody from './pageBody'

const Page = ({ page }) => {
  // console.log('page: ', page)
  return (
    <>
      <PageHeader title={page?.title} />
      <PageBody content={page?.content} />
    </>
  )
}

export default Page
