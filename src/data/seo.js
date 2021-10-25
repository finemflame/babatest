// all Seo
export const SeoItems = `
    breadcrumbs {
        text
        url
    }
    title
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    opengraphTitle
    schemaDetails
    opengraphImage {
        sourceUrl
    }
    opengraphSiteName
    opengraphPublishedTime
    opengraphModifiedTime
    twitterTitle
    twitterDescription
    twitterImage {
        sourceUrl
    }
`

// seo items
export const TaxonomySeoItems = `
  breadcrumbs {
    text
    url
  }
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphAuthor
  opengraphDescription
  opengraphTitle
  schema {
    raw
  }
  opengraphImage {
    sourceUrl
  }
  opengraphSiteName
  opengraphPublishedTime
  opengraphModifiedTime
  twitterTitle
  twitterDescription
  twitterImage {
    sourceUrl
  }
`

// seo fragmemt
export const SeoFragment = `
    fragment SeoFragment on PostTypeSEO {
        ${SeoItems}
    }
`
// seo fragmemt
export const SeoTaxFragment = `
    fragment SeoFragment on TaxonomySEO {
        ${SeoItems}
    }
`
