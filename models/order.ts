import type { Room } from './room'
import type { UserInfo } from './user-info'

export type BookingResult = (Partial<Room> & {
  user: UserInfo
}) | null
