import CoverImage from './coverImage'
import PostHeader from './postHeader'
import PostBody from './postBody'
import PostMeta from './postMeta'

const Post = ({ post }) => {
  // console.log('Post: ', post)
  return (
    <>
      {post?.featuredImage?.node && (
        <CoverImage
          title={post?.title}
          coverImage={post?.featuredImage?.node}
          slug={post?.slug}
          uri={post?.uri}
          width='1920'
        />
      )}
      <PostHeader title={post?.title} />
      <PostMeta
        tags={post?.tags}
        categories={post?.categories}
        date={post?.date}
        author={post?.author?.node}
      />
      <PostBody content={post?.content} />
    </>
  )
}

export default Post
