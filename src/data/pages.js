import { SeoFragment } from './seo'

// All Pages
export const AllPages = `
    query AllPagesQuery {
        pages(where: {status: PUBLISH}, first: 5) {
            edges {
                node {
                    id
                    uri
                    slug
                }
            }
        }
    }
  `

// query PageBySlugQuery($id: ID!, $idType: PageIdType!) {
export const PageByUri = `    
    query PageByUri ($uri: ID!) {
        page(id: $uri, idType: URI) {
            id
            title
            slug
            date
            modified
            content
            uri
            seo {
                ...SeoFragment
            }
        }
    }
    ${SeoFragment}
`
