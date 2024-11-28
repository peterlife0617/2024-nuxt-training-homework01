export interface Room {
  _id: string
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  layoutInfo: {
    title: string
    isProvide: boolean
  }[]
  facilityInfo: Record<string, any>[]
  amenityInfo: Record<string, any>[]
  createdAt: string
  updatedAt: string
}
