import { TaxonomySeoItems } from './seo'

// tags fragment
export const TagFragment = `
    fragment TagFragment on Tag {
      id
      databaseId
      title: name
      slug 
    }
`

// get all
export const AllTags = `
query AllTagsQuery {
    tags (first: 20) {
      edges {
        node {
          ...TagFragment         
        }
      }
    }
  } 
  ${TagFragment} 
`
export const TagBySlug = `
query AllTagsQuery($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      ...TagFragment
      seo {
        ${TaxonomySeoItems}
      }
    }
  }
  ${TagFragment}
`
