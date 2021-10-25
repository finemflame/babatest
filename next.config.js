const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_IMAGE_DOMAIN,
      'secure.gravatar.com'
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}
