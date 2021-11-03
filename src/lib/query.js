import { isEmpty } from 'lodash'
import fetcher from './fetcher'
import { includesPageUri } from '../utils/helpers'
import {
  ALL_CATEGORIES,
  ALL_PAGES_URI,
  ALL_POSTS,
  ALL_MENUS,
  ALL_SITE_META,
  CATEGORY_BY_URI,
  LATEST_POSTS,
  PAGE_BY_URI,
  POST_BY_URI,
  POSTS_BY_CATEGORY_ID
} from './api'

// get all category slugs
export async function getAllCategorySlugs() {
  const response = await fetcher(ALL_CATEGORIES)

  return response?.data?.categories?.edges
}

// get all post slugs
export async function getAllPostSlugs() {
  const response = await fetcher(ALL_POSTS)

  return response?.data?.posts?.edges
}

// get all slugs
export async function getAllSlugs(allPosts) {
  const response = await fetcher(allPosts)
  return response?.data
}

// get all page paths
export async function getAllPagePaths() {
  const allPages = await getAllSlugs(ALL_PAGES_URI)

  const pagesPathsData = []

  allPages &&
    allPages?.pages?.edges.map(page => {
      if (page?.node?.uri !== null && !includesPageUri(page?.node?.uri)) {
        const slugs = page?.node?.uri?.split('/').filter(pageSlug => pageSlug)
        pagesPathsData.push({ params: { slug: slugs } })
      }
    })

  return pagesPathsData
}
// get all category and post slugs and return array of paths
export async function getAllCategoryPostSlugs() {
  // const allCategories = await getAllSlugs(ALL_CATEGORIES)
  const allCategories = await getAllCategorySlugs()

  const allPosts = await getAllSlugs(ALL_POSTS)

  const allCatPostsPaths = []

  // allCategories?.categories?.edges.map(category => {
  allCategories.map(category => {
    if (!isEmpty(category.node.uri)) {
      const slugs = category?.node?.uri
        .split('/')
        .filter(categorySlug => categorySlug)
      allCatPostsPaths.push({
        params: { slugParent: slugs.shift(), slugChild: slugs }
      })
    }
  })

  allPosts?.posts?.edges.map(post => {
    const slugs = post?.node?.uri.split('/').filter(postSlug => postSlug)
    allCatPostsPaths.push({
      params: { slugParent: slugs.shift(), slugChild: slugs }
    })
  })

  return allCatPostsPaths
}

// get category data with posts
export async function getCategoryWithPosts(slugParent, slugChild = '') {
  let slug = `/${slugParent}/`
  if (slugChild) {
    slug = `/${slugParent}/${slugChild.join('/')}/`
  }
  let variables = {
    uri: slug
  }

  const pageData = await fetcher(CATEGORY_BY_URI, { variables })

  variables = {
    categoryId: pageData?.data?.category?.categoryId
  }

  const postsData = await fetcher(POSTS_BY_CATEGORY_ID, { variables })

  const data = {
    pageData,
    postsData
  }

  return data
}

// get index page data
export async function getIndexPageData() {
  const menusData = await fetcher(ALL_MENUS)
  const metaData = await fetcher(ALL_SITE_META)

  let data = {}
  const variables = {
    uri: '/'
  }

  const latestPosts = await fetcher(LATEST_POSTS)
  const pageData = await fetcher(PAGE_BY_URI, { variables })

  return (data = {
    type: 'category',
    menus: menusData.data || {},
    meta: metaData.data || {},
    page: {
      uri: pageData?.data?.page?.uri || {},
      seo: pageData?.data?.page?.seo || {},
      page: pageData?.data?.page || {},
      posts: latestPosts?.data?.posts || {}
    }
  })
}

// all pages data
export async function getAllPageData({ params: { slug } }) {
  const menusData = await fetcher(ALL_MENUS)
  const metaData = await fetcher(ALL_SITE_META)

  let data = {}

  const variables = {
    uri: `/${slug.join('/')}/`
  }

  const pageData = await fetcher(PAGE_BY_URI, { variables })

  return (data = {
    type: 'page',
    menus: menusData.data || {},
    meta: metaData.data || {},
    page: {
      uri: pageData?.data?.page?.uri || {},
      seo: pageData?.data?.page?.seo || {},
      page: pageData?.data?.page || {}
    }
  })
}

// all category/posts data
export async function getAllCategoryPostData({
  params: { slugParent, slugChild }
}) {
  const menusData = await fetcher(ALL_MENUS)

  const metaData = await fetcher(ALL_SITE_META)

  // return if no paths found
  if (isEmpty(slugParent) && isEmpty(slugChild)) {
    let data = {}
    return (data = {})
  }

  // slugParent found, no slugChild return category page data
  if (!isEmpty(slugParent) && isEmpty(slugChild)) {
    let data = {}

    const { pageData, postsData } = await getCategoryWithPosts(slugParent)

    return (data = {
      type: 'category',
      menus: menusData.data || {},
      meta: metaData.data || {},
      page: {
        uri: pageData?.data?.category?.uri || {},
        seo: pageData?.data?.category?.seo || {},
        category: pageData?.data?.category || {},
        post: {},
        posts: postsData?.data?.posts || {}
      }
    })
  }

  // slugChild length only 1, must be a Post then
  if (Array.isArray(slugChild) && slugChild.length >= 1) {
    let data = {}
    let viewType = 'post'
    const slug = `/${slugParent}/${slugChild.join('/')}/`

    let variables = {
      uri: slug
    }

    let pageData = await fetcher(POST_BY_URI, { variables })

    let postsData = { data: { posts: {} } }
    let viewUri = pageData?.data?.post?.uri
    let viewSeo = pageData?.data?.post?.seo

    if (pageData.data.post.uri === null) {
      const catPostsData = await getCategoryWithPosts(slugParent, slugChild)
      pageData = catPostsData.pageData
      postsData = catPostsData.postsData
      viewType = 'category'
      viewUri = pageData.data?.category?.uri
      viewSeo = pageData.data?.category?.seo
    }

    return (data = {
      type: viewType,
      menus: menusData.data || {},
      meta: metaData.data || {},
      page: {
        uri: viewUri || {},
        seo: viewSeo || {},
        category: pageData?.data?.category || {},
        post: pageData?.data?.post || {},
        posts: postsData?.data?.posts || {}
      }
    })
  }
}
