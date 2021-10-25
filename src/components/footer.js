import Container from './container'
// import ParseHTML from './../utils/parseHTML'
import FooterNav from './footerNav'
import styles from '../styles/footer.module.scss'

export default function Footer({ data, footerNav }) {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          {/* TODO
          ## ParseHML function on widgets causes error:
          ## Warning: Prop `href` did not match.
          ## Found this: https://github.com/vercel/next.js/issues/22130
          
          
          {/* <div className={styles.links}>{ParseHTML(data?.sidebarOne)}</div> */}
          {/* <div className={styles.links}>{ParseHTML(data?.sidebarTwo)}</div> */}
          <div className={styles.links}>
            <FooterNav nav={footerNav} />
          </div>
        </div>
        <div
          className={styles.copyright}
          dangerouslySetInnerHTML={{ __html: data.copyrightText }}
        />
      </Container>
    </footer>
  )
}
