import { SeoFragment } from './seo'
import { TagFragment } from './tags'

// summary post items
export const SummaryPostItems = `
    date
    excerpt
    id
    slug
    title
    uri
`

// full post fragment
export const PostFragment = `
    fragment PostFragment on Post {
        ${SummaryPostItems}
        databaseId
        modified
        content
    }
`

// featured image fragment
export const FeaturedImageFragment = `
    fragment FeaturedImageFragment on MediaItem {
        altText
        mediaDetails {
            width
            height
        }
        caption
        id
        sizes
        sourceUrl
        srcSet
    }
`

// author fragment
export const AuthorFragment = `
    fragment AuthorFragment on User {
        id
        name
        firstName
        lastName
        slug
        avatar {
            height
            width
            url
        }
    }
`

// categories fragment
export const CategoryFragment = `
    fragment CategoryFragment on Category {
        categoryId
        databaseId
        id
        title: name
        slug
        uri
    }
`

//grab all posts
export const AllPosts = `
    query AllPostsQuery {
        posts(first: 11, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
            edges {
                node {
                    id
                    slug
                    uri
                }
            }
        }
    }
`

// latest posts
export const LatestPosts = `
    query LatestPosts {
        posts(first: 11, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
            edges {
                node {
                    ${SummaryPostItems}
                    isSticky
                    featuredImage {
                        node {
                            ...FeaturedImageFragment
                        }
                    }
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                }
            }
        }
    }
    ${FeaturedImageFragment}
    ${AuthorFragment}
`

//get post data
export const PostByUri = `
    query PostByUri ($uri: ID!) {
        post(id: $uri, idType: URI) {
            ...PostFragment
            featuredImage {
                node {
                    ...FeaturedImageFragment
                }
            }
            author {
                node {
                    ...AuthorFragment
                }
            }
            categories {
                nodes {
                    ...CategoryFragment
                }
            }
            seo {
                ...SeoFragment
            }
            tags {
                nodes{
                    ...TagFragment
                }
            }
        }
    }
    ${PostFragment}
    ${FeaturedImageFragment}
    ${AuthorFragment}
    ${CategoryFragment}
    ${SeoFragment}
    ${TagFragment}
`

//get post data
export const PostBySlug = `
    query PostBySlug ($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            ...PostFragment
            featuredImage {
                node {
                    ...FeaturedImageFragment
                }
            }
            author {
                node {
                    ...AuthorFragment
                }
            }
            categories {
                nodes {
                    ...CategoryFragment
                }
            }
            seo {
                ...SeoFragment
            }
            tags {
                nodes{
                    ...TagFragment
                }
            }
        }
    }
    ${PostFragment}
    ${FeaturedImageFragment}
    ${AuthorFragment}
    ${CategoryFragment}
    ${SeoFragment}
    ${TagFragment}
`

// posts by category ID
export const PostsByCategoryId = `
    query PostsByCategoryIdQuery($categoryId: Int!) {
        posts(first: 11, where: { categoryId: $categoryId, orderby: {field: DATE, order: DESC}, status: PUBLISH }) {
            edges {
                node {
                    ${SummaryPostItems}
                    isSticky
                    featuredImage {
                        node {
                            ...FeaturedImageFragment
                        }
                    }
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                    categories {
                        edges {
                            node {
                                categoryId
                                ...CategoryFragment
                            }
                        }
                    }
                }
            }
        }
    }
    ${FeaturedImageFragment}
    ${AuthorFragment}
    ${CategoryFragment}
`

// posts by tag ID
export const PostsByTagId = `
    query PostsByTagIdQuery($tagId: String) {
        posts(first: 11, where: { tagId: $tagId, orderby: {field: DATE, order: DESC}, status: PUBLISH }) {
            edges {
                node {
                    ${SummaryPostItems}
                    isSticky
                    featuredImage {
                        node {
                            ...FeaturedImageFragment
                        }
                    }
                    author {
                        node {
                            ...AuthorFragment
                        }
                    }
                    categories {
                        edges {
                            node {
                                ...CategoryFragment
                            }
                        }
                    }
                    seo {
                        ...SeoFragment
                    }
                }
            }
        }
    }
    ${FeaturedImageFragment}
    ${AuthorFragment}
    ${CategoryFragment}
    ${SeoFragment}
`
