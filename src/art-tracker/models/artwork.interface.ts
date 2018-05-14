export interface Artwork {
  code: string,
  description: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}