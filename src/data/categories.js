import { TaxonomySeoItems } from './seo'

// category fragment
export const CategoryFragment = `
  fragment CategoryFragment on Category {
    categoryId
    databaseId
    id
    parentId
    slug
    title: name
    uri
  }
`

// All categories
export const AllCategories = `
  query AllCategories {
    categories(first: 10) {
      edges {
        node {
          id
          slug
          uri
          title: name
        }
      }
    }
  }
`

// category by category by uri
export const CategoryByUri = `
  query CategoryByUriQuery($uri: ID!) {
    category(id: $uri, idType: URI) {
      categoryId
      databaseId
      id
      parentId
      slug
      title: name
      uri
      seo {
        ${TaxonomySeoItems}
      }
    }
  }
`
