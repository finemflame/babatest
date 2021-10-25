import Head from 'next/head'
import Seo from './seo'
import { sanitize } from '../utils/helpers'
import Header from './header'
import Footer from './footer'
import styles from '../styles/layout.module.scss'

const Layout = ({ children, data }) => {
  // if (!data?.page) {
  //   return null
  // }

  const document = data || {}

  const pageData =
    document?.pageData?.page ||
    document?.pageData?.post ||
    document?.pageData?.category ||
    document?.pageData?.tag

  return (
    <>
      <Seo seo={pageData?.seo} uri={pageData?.uri} />
      <Head>
        {document?.siteMeta?.headerMeta?.favicon && (
          <link
            rel='shortcut icon'
            href={document?.siteMeta?.headerMeta?.favicon}
          />
        )}

        {document?.seo?.schemaDetails || document?.seo?.schema?.raw ? (
          <script
            type='application/ld+json'
            className='yoast-schema-graph'
            key='yoastSchema'
            dangerouslySetInnerHTML={{
              __html: sanitize(
                document?.seo.schemaDetails || document?.seo?.schema?.raw
              )
            }}
          />
        ) : null}
      </Head>
      <div className={styles.wrapper}>
        <Header
          meta={document?.siteMeta?.headerMeta}
          nav={document?.menus?.primaryMenu?.edges}
        />
        <main>{children}</main>
      </div>
      <Footer
        data={document?.siteMeta?.footerMeta}
        footerNav={document?.menus?.secondaryMenu?.edges}
      />
    </>
  )
}

export default Layout
