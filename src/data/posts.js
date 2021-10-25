import { SeoFragment } from './seo'
import { TagFragment } from './tags'

// latest posts
export const LatestPosts = `
    query LatestPosts {
        posts(first: 11, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
            nodes {
                title
                excerpt
                slug
                date
                uri
                featuredImage {
                    node {
                        sourceUrl
                        altText
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
                author {
                    node {
                        name
                        firstName
                        lastName
                        avatar {
                            url
                        }
                    }
                }
            }
        }
    }
`

//grab all posts
export const AllPosts = `
    query AllPostsQuery {
        posts(first: 11, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
            nodes {
                title
                excerpt
                slug
                date
                uri
                featuredImage {
                    node {
                        sourceUrl
                        altText
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
                author {
                    node {
                        name
                        firstName
                        lastName
                        avatar {
                            url
                        }
                    }
                }
            }
        }
    }
`

//get post data
export const PostBySlug = `
    query PostBySlug ($uri: String) {
        post: postBy(uri: $uri) {
            author {
                node {
                    avatar {
                        height
                        url
                        width
                    }
                    id
                    name
                    slug
                }
            }
            title
            slug
            date
            categories {
                nodes {
                    categoryId
                    name
                    uri
                }
            }
            content
            uri
            featuredImage {
                node {
                    altText
                    sourceUrl
                    mediaDetails {
                        width
                        height
                    }
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
    ${SeoFragment}
    ${TagFragment}
`

// export const PostBySlug = `
//     query PostBySlug ($id: ID!, $idType: PostIdType!) {
//         post(id: $id, idType: $idType, orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
//             title
//             slug
//             date
//             content
//             uri
//             featuredImage {
//                 node {
//                     altText
//                     sourceUrl
//                     mediaDetails {
//                         width
//                         height
//                     }
//                 }
//             }
//             seo{
//                 ...SeoFragment
//             }
//         }
//     }
//      ${SeoFragment}
// `

// posts by category ID
export const PostsByCategoryId = `
    query PostsByCategoryIdQuery($categoryId: Int!) {
        posts(first: 11, where: { categoryId: $categoryId, orderby: {field: DATE, order: DESC}, status: PUBLISH }) {
            nodes {
                author {
                    node {
                    avatar {
                        height
                        url
                        width
                    }
                    id
                    name
                    slug
                    }
                }
                id
                categories {
                    edges {
                    node {
                        databaseId
                        id
                        name
                        slug
                    }
                    }
                }
                content
                date
                excerpt
                featuredImage {
                    node {
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
                }
                modified
                databaseId
                title
                slug
                isSticky
                uri
                }
        }
    }
`

// posts by tag ID
export const PostsByTagId = `
    query PostsByTagIdQuery($tagId: String) {
        posts(first: 11, where: { tagId: $tagId, orderby: {field: DATE, order: DESC}, status: PUBLISH }) {
            nodes {
                author {
                    node {
                    avatar {
                        height
                        url
                        width
                    }
                    id
                    name
                    slug
                    }
                }
                id
                categories {
                    edges {
                    node {
                        databaseId
                        id
                        name
                        slug
                    }
                    }
                }
                content
                date
                excerpt
                featuredImage {
                    node {
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
                }
                modified
                databaseId
                title
                slug
                isSticky
                uri
                seo {
                    ...SeoFragment
                }
                }
        }
    }
    ${SeoFragment}
`
