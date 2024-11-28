import type { BookingResult } from '~/models/order'

export const useBookingStore = defineStore('booking', () => {
  // 訂單資訊的格式
  const bookingResult = ref<BookingResult>(null)

  return {
    bookingResult,
  }
})
