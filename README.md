# Next.js + Headless WordPress + TailwindCSS Starter

Basic styling with TailwindCSS.
Design based on NextJS official CMS examples.
Source from a WordPress GraphQL endpoint.

## Features

- Categories with sub categories
- Posts
- Tags
- Pages with nested pages
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
2. Copy `.env-example` and rename to `.env`, configure
3. Additional options in `/src/config/index.js`
4. Run `npm install`
5. Run `npm dev`

## TODO

- Custom Gutenberg blocks
- Elementor.. ?
- Match WP theme.. ?
