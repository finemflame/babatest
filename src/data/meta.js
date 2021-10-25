// query site meta, logo, favicon, etc
export const AllSiteMeta = `
query AllMetaQuery {
    headerMeta: getHeader {
      favicon
      siteLogoUrl
      siteTagLine
      siteTitle
    }
    footerMeta: getFooter {
      copyrightText
      sidebarOne
      sidebarTwo
      socialLinks {
        iconName
        iconUrl
      }
    }
  }
`
