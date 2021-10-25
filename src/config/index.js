export const siteMeta = {
  siteName: 'My Blog',
  siteDescription: 'Something on the way',
  siteUrl: process.env.NEXT_PUBLIC_WORDPRESS_LIVE_SITE,
  siteAPIDomain: process.env.NEXT_PUBLIC_WORDPRESS_API_DOMAIN,
  social: {
    twitterSite: '@mytwitterhandle',
    twitterAuthor: '@mytwitterhandle'
  }
}

export const siteConfig = {
  graphQl: process.env.WORDPRESS_API_URL,
  placeHolderImage: '/images/placeholder.png'
}

export const FALLBACK = 'blocking'
