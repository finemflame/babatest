import Container from './container'
import HeroPost from './heroPost'
import AllPosts from './allPosts'
import PageHeader from './pageHeader'

const Posts = ({ data, title, isHome }) => {
  const posts = data?.posts?.nodes
  const heroPost = posts[0]
  const morePosts = posts.slice(1)
  return (
    <Container>
      {!isHome && <PageHeader title={title} />}
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.featuredImage?.node}
          date={heroPost.date}
          author={heroPost.author?.node}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          uri={heroPost.uri}
        />
      )}
      {morePosts.length > 0 && <AllPosts posts={morePosts} />}
    </Container>
  )
}

export default Posts
