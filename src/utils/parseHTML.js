import parse from 'html-react-parser'
import { Element } from 'domhandler/lib/node'
import Image from 'next/image'
import Link from 'next/link'
import { isInternal } from '../utils/helpers'
import { siteMeta, siteConfig } from '../config'

const config = {
  replace: domNode => {
    if (domNode instanceof Element && domNode.name === 'img') {
      const { src, alt, width, height } = domNode.attribs

      return (
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          layout='responsive'
          objectFit='cover'
          placeholder='blur'
          blurDataURL={siteConfig.placeHolderImage}
        />
      )
    }

    if (domNode instanceof Element && domNode.name === 'a') {
      let { title, href, target, rel } = domNode.attribs

      const wpUrl = siteMeta.siteAPIDomain

      if (!href.startsWith(`/`)) {
        href = href.replace(wpUrl, '')
      }

      if (isInternal(href)) {
        return (
          <Link href={href}>
            <a title={title}>{domNode.children[0].data}</a>
          </Link>
        )
      }
      if (!isInternal(href))
        return (
          <a href={href} title={title} rel={rel} target={target}>
            {domNode.children[0].data}
          </a>
        )
    }
  }
}

const ParseHTML = html => {
  const clean = html && parse(html, config)
  return clean
}

export { ParseHTML }
export default ParseHTML
