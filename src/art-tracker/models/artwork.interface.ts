export interface Artwork {
  series: string,
  code: string,
  description: string,
  location: string,
  dimensions: string,
  retailPrice: number,
  wholesalePrice: number,
  commission: number,
  dateCreated: Date,
  dateSold: Date,
  timestamp: number,
  $key: string,
  $exists : () => boolean
}