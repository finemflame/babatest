import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/postIntroImage.module.scss'

const PostIntroImage = ({ title, coverImage, slug, uri }) => {
  const imgWidth = 900
  const imgHeight =
    (imgWidth / coverImage.mediaDetails.width) * coverImage.mediaDetails.height
  const image = (
    <Image
      width={imgWidth}
      height={imgHeight}
      alt={`Cover Image for ${title}`}
      src={coverImage?.sourceUrl}
      layout='responsive'
      placeholder='blur'
      blurDataURL='/images/placeholder.png'
    />
  )
  return (
    <div className={styles.wrapper}>
      {slug ? (
        <Link href={`${uri}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default PostIntroImage
