export interface Artwork {
  name: string,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}