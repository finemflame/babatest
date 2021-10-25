import Container from './container'
import styles from '../styles/pageHeader.module.scss'

const PageHeader = ({ title }) => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Container>
    </section>
  )
}

export default PageHeader
