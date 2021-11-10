import fetcher from '../lib/fetcher'
import { ALL_MENUS, ALL_SITE_META } from '../lib/api'
import Link from 'next/link'
import Layout from '../components/layout'
import Container from '../components/container'
import styles from '../styles/404.module.scss'

function NotFoundPage({ data }) {
  return (
    <Layout data={data}>
      <section className={styles.wrapper}>
        <Container>
          <h1>404</h1>
          <p>
            This is not the page you were looking for.
            <br />
            Let&apos;s take you{' '}
            <Link href='/'>
              <a>home</a>
            </Link>
          </p>
        </Container>
      </section>
    </Layout>
  )
}

export default NotFoundPage

export async function getStaticProps() {
  const menus = await fetcher(ALL_MENUS)
  const meta = await fetcher(ALL_SITE_META)

  return {
    props: {
      data: {
        menus: menus.data || {},
        siteMeta: meta.data || {},
        pageData: {
          seo: {
            title: '404 - Page Not Found'
          }
        }
      }
    },
    revalidate: 1
  }
}
