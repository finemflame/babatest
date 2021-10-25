import DOMPurify from 'dompurify'
import { isEmpty } from 'lodash'

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = content => {
  return process.browser ? DOMPurify.sanitize(content) : content
}

/**
 * Get Singular or plural text.
 *
 * @param {Int} count Count.
 * @param {String} text text.
 *
 * @returns {string} Singular or plural from of text.
 */
export const getSingularOrPluralText = (count, text) => {
  return 1 < count ? `${text}s` : text
}

export const includesPageUri = uri => {
  const excludePages = ['/']

  return excludePages.includes(uri)
}

export const handleRedirectsAndReturnData = (
  defaultProps,
  data,
  errors,
  field,
  isPreview = false,
  loginRedirectURL = ''
) => {
  if (isPreview && null === data?.[field]) {
    return {
      redirect: {
        destination: loginRedirectURL || '/',
        statusCode: 307
      }
    }
  }

  if (isEmpty(data)) {
    return {
      redirect: {
        destination: '/503',
        statusCode: 301
      }
    }
  }

  if (field && isEmpty(data?.[field])) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true
    }
  }

  return defaultProps
}

export function isInternal(url) {
  if (!url) return false
  if (url.startsWith('mailto:')) return false
  if (url.startsWith('tel:')) return false
  if (url.startsWith('http')) return false
  return true
}

export function decodeHTML(html) {
  html = html.replace('amp;', '')
  return html.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec)
  })
}
