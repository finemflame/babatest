import Link from 'next/link'
import Container from './container'
import Date from './date'
import Avatar from './avatar'
import styles from '../styles/postMeta.module.scss'

const PostMeta = ({ tags, categories, date, author }) => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.tags}>
          {tags?.nodes &&
            tags.nodes.map(tag => {
              return (
                <span key={tag.id}>
                  <Link href={`/tag/${tag.slug}/`}>
                    <a title={tag.title}>{tag.title}</a>
                  </Link>{' '}
                </span>
              )
            })}
        </div>
        {categories?.nodes && (
          <div className={styles.categories}>
            <p>
              Posted in:{' '}
              <Link href={categories.nodes[0].uri}>
                <a title={categories.nodes[0].title}>
                  {categories.nodes[0].title}
                </a>
              </Link>
            </p>
          </div>
        )}
        {date && (
          <div className={styles.date}>
            <Date dateString={date} />
          </div>
        )}
        {author && <Avatar author={author} />}
      </Container>
    </section>
  )
}

export default PostMeta
