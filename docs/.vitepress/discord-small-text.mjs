/**
 * Discord-style small text.
 *
 * Usage:
 * -# This text is shown as subdued small text.
 */
export default function discordSmallText(md) {
  function smallTextRule(state, startLine, _endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const end = state.eMarks[startLine]
    const line = state.src.slice(start, end)
    const match = line.match(/^-#[ \t]+(.+)$/)

    if (!match) return false
    if (silent) return true

    const open = state.push('paragraph_open', 'p', 1)
    open.attrSet('class', 'discord-small-text')
    open.map = [startLine, startLine + 1]

    const inline = state.push('inline', '', 0)
    inline.content = match[1]
    inline.map = [startLine, startLine + 1]
    inline.children = []

    state.push('paragraph_close', 'p', -1)
    state.line = startLine + 1

    return true
  }

  md.block.ruler.before(
    'paragraph',
    'discord-small-text',
    smallTextRule
  )
}
