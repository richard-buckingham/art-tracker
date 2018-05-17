export interface Artwork {
  series: string,
  code: string,
  description: string,
  location: string,
  dimensions: string,
  retailPrice: string,
  wholesalePrice: string,
  dateSold: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}