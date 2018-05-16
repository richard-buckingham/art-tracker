export interface Artwork {
  series: string,
  code: string,
  description: string,
  location: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}