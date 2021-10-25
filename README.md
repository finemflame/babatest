# Next.js + Headless WordPress + TailwindCSS Starter

Basic styling with TailwindCSS.
Design based on NextJS official CMS examples.
Source from a WP GraphQL endpoint.

## Features

- Categories (TODO - sub categories)
- Posts
- Tags
- Pages
- Replaces internal links with 'next/link'
- Replaces 'inline images' with 'next/image'
- Off Canvas menu
- Gutenberg blocks CSS (not tested)

## WordPress Plugins

- [WPGraphQL](https://wordpress.org/plugins/wp-graphql/)
- [Add WPGraphQL SEO](https://wordpress.org/plugins/add-wpgraphql-seo/)
- [Headless CMS](https://wordpress.org/plugins/headless-cms/)
- [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)

## Setup

1. Clone repository
2. Copy `.env-example` and rename, configure
3. Additional options in `/src/config/index.js`

## TODO

- There's an issue with sub-categories that still needs sorting out
- Custom Gutenberg blocks
- Elementor.. ?
- Match WP theme.. ?
