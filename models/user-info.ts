interface UserInfoAddress {
  zipcode: number
  county: string
  district: string
  detail: string
}

export interface UserInfo {
  address: UserInfoAddress | Partial<UserInfoAddress>
  name?: string
  phone?: string
  email?: string
}
