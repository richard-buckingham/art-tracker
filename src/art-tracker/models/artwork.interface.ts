export interface Artwork {
  code: string,
  name: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}