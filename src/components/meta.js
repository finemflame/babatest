import Head from 'next/head'
import { siteMeta } from '../config'

const Meta = ({ title, description }) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
      <title>
        {title ? title + ' | ' + siteMeta.siteName : siteMeta.siteName}
      </title>
    </Head>
  )
}

Meta.defaultProps = {
  title: siteMeta.siteName,
  description: siteMeta.siteDescription
}

export default Meta
