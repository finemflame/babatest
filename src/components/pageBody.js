import Container from './container'
import ParseHTML from '../utils/parseHTML'
import styles from '../styles/pageBody.module.scss'

const PageBody = ({ content }) => {
  return (
    <section>
      <Container>
        <article>
          {/* <div
            className={styles.wrapper}
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
          <div className={styles.wrapper}>{ParseHTML(content)}</div>
        </article>
      </Container>
    </section>
  )
}

export default PageBody
