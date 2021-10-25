import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/coverImage.module.scss'

export default function CoverImage({ title, coverImage, slug, uri, width }) {
  const imgWidth = width
  const imgHeight =
    (imgWidth / coverImage?.mediaDetails?.width) *
    coverImage?.mediaDetails?.height
  const image = coverImage && (
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
