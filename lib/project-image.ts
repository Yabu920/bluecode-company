export function projectImageSource(value?: string | null) {
  if (!value) return undefined
  if (/^\/[a-z0-9][a-z0-9/_.-]*\.(png|jpe?g|webp|avif)$/i.test(value)) return value
  try {
    const url = new URL(value)
    if (url.origin === "https://res.cloudinary.com" && !url.search && !url.hash && !url.username && !url.password) {
      return url.href
    }
  } catch {
    return undefined
  }
}
