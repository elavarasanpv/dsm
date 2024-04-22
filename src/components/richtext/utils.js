import DOMPurify from 'dompurify'

export function sanitize(html) {
  if (html === '0' || html === 0) {
    return html
  }
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'],
  })
}
