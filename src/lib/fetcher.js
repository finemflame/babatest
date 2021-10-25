import { siteConfig } from '../config'

const wpUrl = siteConfig.graphQl

async function fetcher(query, { variables } = {}) {
  const res = await fetch(wpUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })

  const json = await res.json()

  return json
}

export default fetcher
