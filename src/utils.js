export function sanitizeText(text) {
  return text
    .replace(/\[.*?\]/g, "")
    .replace(/[.?!,]/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[…–]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
