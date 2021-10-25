import PostIntro from './postIntro'
import styles from '../styles/allPosts.module.scss'

const AllPosts = ({ posts }) => {
  return (
    <section className={styles.wrapper}>
      <h2>More Stories</h2>
      <div className={styles.grid}>
        {posts.map(post => {
          return (
            <PostIntro
              key={post.slug}
              title={post.title}
              coverImage={post.featuredImage?.node}
              date={post.date}
              author={post.author?.node}
              slug={post.slug}
              uri={post.uri}
              excerpt={post.excerpt}
            />
          )
        })}
      </div>
    </section>
  )
}

export default AllPosts
