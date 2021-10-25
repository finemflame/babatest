import { SeoFragment } from './seo'

// All Pages
export const AllPagesUri = `
    query AllPagesQuery {
        pages(where: {status: PUBLISH}, first: 20) {
            edges {
                node {
                    id
                    uri
                }
            }
        }
    }
  `

// query PageBySlugQuery($id: ID!, $idType: PageIdType!) {
export const PageByUri = `    
    query PageByUriQuery($uri: String) {
        page: pageBy(uri: $uri) {
            title
            slug
            date
            modified
            content
            uri
            featuredImage {
                node {
                    altText
                    sourceUrl
                    caption
                }
            }
            seo {
                ...SeoFragment
            }
        }
    }
    ${SeoFragment}
`
