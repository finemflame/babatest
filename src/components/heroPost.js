import Avatar from './avatar'
import Date from './date'
import CoverImage from './coverImage'
import Link from 'next/link'
import styles from '../styles/heroPost.module.scss'

const HeroPost = ({ title, coverImage, date, excerpt, author, slug, uri }) => {
  return (
    <section>
      <div className={styles.image}>
        {coverImage && (
          <CoverImage
            title={title}
            coverImage={coverImage}
            slug={slug}
            uri={uri}
            width='2000'
          />
        )}
      </div>
      <div className={styles.intro}>
        <div>
          <h3>
            <Link href={`${uri}`}>
              <a dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
          </h3>
          <div className={styles.date}>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar author={author} />
        </div>
      </div>
    </section>
  )
}

export default HeroPost
