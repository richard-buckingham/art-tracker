export interface Artwork {
  series: string,
  code: string,
  description: string,
  location: string,
  dimensions: string,
  retailPrice: number,
  wholesalePrice: number,
  commission: number,
  dateSold: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}