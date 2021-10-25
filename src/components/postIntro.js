import Link from 'next/link'
import Avatar from './avatar'
import Date from './date'
import PostIntroImage from './postIntroImage'
import { decodeHTML } from '../utils/helpers'
import ParseHTML from '../utils/parseHTML'
import styles from '../styles/postIntro.module.scss'

const PostIntro = ({ title, coverImage, date, excerpt, author, slug, uri }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {coverImage && (
          <PostIntroImage
            title={title}
            coverImage={coverImage}
            slug={slug}
            uri={uri}
          />
        )}
      </div>
      <h3>
        <Link href={`${uri}`}>
          <a>{decodeHTML(title)}</a>
        </Link>
      </h3>
      <div className={styles.date}>
        <Date dateString={date} />
      </div>
      {/* <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      /> */}
      <div className={styles.excerpt}>{ParseHTML(excerpt)}</div>
      <Avatar author={author} />
    </div>
  )
}

export default PostIntro
