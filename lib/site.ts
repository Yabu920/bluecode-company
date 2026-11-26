export function getSiteUrl() {
  return new URL(process.env.AUTH_URL ?? "https://bluecodes.com.et")
}
