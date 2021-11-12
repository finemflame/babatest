import Container from './container'
import ParseHTML from './../utils/parseHTML'
// import FooterNav from './footerNav'
import styles from '../styles/footer.module.scss'

// export default function Footer({ data, footerNav }) {
export default function Footer({ data }) {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          {/* <div className={styles.links}>
            <FooterNav nav={footerNav} />
          </div> */}

          <div className={styles.links}>{ParseHTML(data?.sidebarOne)}</div>
          <div className={styles.links}>{ParseHTML(data?.sidebarTwo)}</div>
        </div>
        <div
          className={styles.copyright}
          dangerouslySetInnerHTML={{ __html: data.copyrightText }}
        />
      </Container>
    </footer>
  )
}
