interface Address {
  zipcode: number
  detail: string
}

interface UserInfo {
  address: Address
  name: string
  phone: string
  email: string
}

export interface BookingResult {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  userInfo?: UserInfo
}
