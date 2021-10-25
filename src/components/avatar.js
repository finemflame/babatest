import Image from 'next/image'
import styles from '../styles/avatar.module.scss'

const Avatar = ({ author }) => {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={author.avatar.url} layout='fill' alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default Avatar
