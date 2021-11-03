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
              key={post.node.slug}
              title={post.node.title}
              coverImage={post.node.featuredImage?.node}
              date={post.node.date}
              author={post.node.author?.node}
              slug={post.node.slug}
              uri={post.node.uri}
              excerpt={post.node.excerpt}
            />
          )
        })}
      </div>
    </section>
  )
}

export default AllPosts
