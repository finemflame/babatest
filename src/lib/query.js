import { isEmpty } from 'lodash'
import fetcher from './fetcher'
import { includesPageUri } from '../utils/helpers'
import {
  ALL_CATEGORIES,
  ALL_PAGES,
  ALL_POSTS,
  ALL_MENUS,
  ALL_SITE_META,
  ALL_TAGS,
  CATEGORY_BY_URI,
  LATEST_POSTS,
  POSTS_BY_TAG_ID,
  PAGE_BY_URI,
  POST_BY_URI,
  POSTS_BY_CATEGORY_ID,
  TAG_BY_SLUG
} from './api'

// get all slugs
export async function getSlugs(allPosts) {
  const response = await fetcher(allPosts)
  return response?.data
}

// get all category and post slugs and return array of paths
export async function getAllCommonPostTypeSlugs() {
  const allPages = await getSlugs(ALL_PAGES)
  const allCategories = await getSlugs(ALL_CATEGORIES)
  const allPosts = await getSlugs(ALL_POSTS)

  const allPaths = []

  allPages &&
    allPages?.pages?.edges.map(page => {
      if (page?.node?.uri !== null && !includesPageUri(page?.node?.uri)) {
        const slugs = page?.node?.uri?.split('/').filter(pageSlug => pageSlug)
        allPaths.push({
          params: { slug: slugs }
        })
      }
    })

  allCategories &&
    allCategories?.categories?.edges.map(category => {
      if (!isEmpty(category?.node?.uri)) {
        const slugs = category?.node?.uri
          .split('/')
          .filter(categorySlug => categorySlug)
        allPaths.push({
          params: { slug: slugs }
        })
      }
    })

  allPosts &&
    allPosts?.posts?.edges.map(post => {
      if (!isEmpty(post?.node?.uri)) {
        const slugs = post?.node?.uri.split('/').filter(postSlug => postSlug)
        allPaths.push({
          params: { slug: slugs }
        })
      }
    })

  return allPaths
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
export async function getAllPageData(slug, query) {
  let data = {}

  const uri = `/${slug.join('/')}/`
  const variables = {
    uri: uri
  }

  const pageData = await fetcher(query, { variables })

  return (data = { pageData })
}

// get category data with posts
export async function getCategoryWithPosts(slug) {
  let data = {}

  const { pageData } = await getAllPageData(slug, CATEGORY_BY_URI)
  const variables = {
    categoryId: pageData?.data?.category?.categoryId
  }

  const postsData = await fetcher(POSTS_BY_CATEGORY_ID, { variables })

  return (data = {
    pageData,
    postsData
  })
}

// all category/posts data
export async function getAllCommonPostTypeData({ params: { slug } }) {
  const menusData = await fetcher(ALL_MENUS)

  const metaData = await fetcher(ALL_SITE_META)

  let data = {}
  let response = {}
  let postType = 'page'
  let documentData = {
    pageData: {},
    postsData: {}
  }
  // return if paths don't exist
  if (isEmpty(slug)) {
    return data
  }

  // slugParent found, no slugChild return category page data
  if (Array.isArray(slug) && slug.length === 1) {
    //get page data
    response = await getAllPageData(slug, PAGE_BY_URI)
    documentData = {
      pageData: response?.pageData?.data?.page
    }

    //if no page data is returned, get category data
    if (isEmpty(documentData?.pageData?.uri)) {
      response = await getCategoryWithPosts(slug)
      postType = 'category'
      documentData = {
        pageData: response?.pageData?.data?.category,
        postsData: response?.postsData?.data?.posts
      }
    }

    return (data = {
      type: postType,
      menus: menusData.data || {},
      meta: metaData.data || {},
      page: {
        uri: documentData?.pageData?.uri || {},
        seo: documentData?.pageData?.seo || {},
        pageInfo: documentData?.pageData || {},
        posts: documentData?.postsData || {}
      }
    })
  }

  // slug array longer than 1
  if (Array.isArray(slug) && slug.length > 1) {
    //get page data
    response = await getAllPageData(slug, PAGE_BY_URI)

    documentData = {
      pageData: response?.pageData?.data?.page,
      postsData: {}
    }
    //if no page data is returned, get category data
    if (isEmpty(documentData?.pageData?.uri)) {
      response = await getCategoryWithPosts(slug)
      postType = 'category'
      documentData = {
        pageData: response?.pageData?.data?.category,
        postsData: response?.postsData?.data?.posts
      }
    }

    //if no category data is returned, get post data
    if (
      isEmpty(documentData?.postsData) &&
      documentData?.pageData?.categoryId === null
    ) {
      response = await getAllPageData(slug, POST_BY_URI)
      postType = 'post'
      documentData = {
        pageData: response?.pageData?.data?.post,
        postsData: {}
      }
    }

    return (data = {
      type: postType,
      menus: menusData.data || {},
      meta: metaData.data || {},
      page: {
        uri: documentData?.pageData?.uri || {},
        seo: documentData?.pageData?.seo || {},
        pageInfo: documentData?.pageData || {},
        posts: documentData?.postsData || {}
      }
    })
  }
}

// get all tag paths
export async function getAllTagSlugs() {
  const response = await fetcher(ALL_TAGS)

  const allTags = response?.data?.tags?.edges

  const paths = allTags.map(tag => {
    return { params: { slug: tag?.node?.slug } }
  })

  return paths
}

// get all tag posts data
export async function getAllTagPostsData(slug) {
  const menusData = await fetcher(ALL_MENUS)
  const metaData = await fetcher(ALL_SITE_META)
  let data = {}
  let variables = {
    slug: slug
  }
  const pageData = await fetcher(TAG_BY_SLUG, { variables })

  variables = {
    tagId: pageData?.data?.tag?.id
  }

  const postsData = await fetcher(POSTS_BY_TAG_ID, { variables })

  return (data = {
    menus: menusData.data || {},
    meta: metaData.data || {},
    page: {
      uri: pageData?.data?.tag?.uri || {},
      seo: pageData?.data?.tag?.seo || {},
      pageInfo: pageData?.data?.tag || {},
      posts: postsData?.data?.posts || {}
    }
  })
}
