import Link from 'next/link'
import Image from 'next/image'
import { siteMeta } from './../config/index'
import Container from './container'
import MainNav from './mainNav'
import HamburgerMenuButton from './hamburgerMenuButton'
import styles from '../styles/header.module.scss'
import OffCanvasMenu from './offCanvasMenu'

export default function Header({ meta, nav }) {
  return (
    <header>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {meta.siteLogoUrl ? (
              <Link href='/'>
                <a>
                  <Image
                    width={300}
                    height={270}
                    alt={`${meta.siteTitle} Logo`}
                    src={meta.siteLogoUrl}
                  />
                </a>
              </Link>
            ) : (
              <>
                <h1>
                  <Link href='/'>
                    <a>{siteMeta.siteName}</a>
                  </Link>
                  .
                </h1>
                <p>{siteMeta.siteDescription}</p>
              </>
            )}
          </div>

          <div className={styles.right}>
            <MainNav nav={nav} />
            <HamburgerMenuButton />
            <span>Open main menu</span>
          </div>
        </div>
      </Container>
      <OffCanvasMenu nav={nav} />
    </header>
  )
}
