import { readFileSync } from 'node:fs'
import path from 'node:path'

function hasNewStatus(source) {
  const frontmatter = source.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
  )

  return Boolean(
    frontmatter &&
    /^\s*status\s*:\s*["']?new["']?\s*$/im.test(frontmatter[1])
  )
}

function pageUrl(file) {
  const sourceDirectory = globalThis.VITEPRESS_CONFIG?.srcDir

  if (!sourceDirectory) return null

  let relativePath = path
    .relative(sourceDirectory, file)
    .split(path.sep)
    .join('/')

  relativePath = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return `/${relativePath}`.replace(/\/{2,}/g, '/')
}

export default {
  watch: '../../../**/*.md',

  load(files) {
    return files.flatMap((file) => {
      const source = readFileSync(file, 'utf8')

      if (!hasNewStatus(source)) return []

      const url = pageUrl(file)

      return url ? [{ url, status: 'new' }] : []
    })
  }
}
