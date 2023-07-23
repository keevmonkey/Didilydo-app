export default function useAssetImageUrl(imagePath: string) {
  const url = new URL(imagePath, import.meta.url).href
  return url
}
