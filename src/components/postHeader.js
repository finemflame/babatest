import Container from './container'
import styles from '../styles/postHeader.module.scss'

const PostHeader = ({ title }) => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Container>
    </section>
  )
}

export default PostHeader
