import type { CreateOrderResponse } from '~/api/models/order'
import type { GetRoomResponse } from '~/api/models/room'
import { ServiceRoom } from '~/api/services/room'
import type { BookingResult } from '~/models/booking'

export const useBookingStore = defineStore('booking', () => {
  const { fetchData } = useApi()
  const { getRoom: apiGetRoom } = ServiceRoom()

  const room = ref<GetRoomResponse | null>(null)
  const bookingResult = ref<BookingResult | null>(null)
  const order = ref<CreateOrderResponse | null>(null)

  const setRoom = (value: GetRoomResponse | null) => {
    room.value = value
  }

  const getRoom = async (id: string) => {
    const response = await fetchData(() => apiGetRoom(id))
    if (response.status) {
      return response.result
    }
    return null
  }

  const setBookingResult = (value: BookingResult | null) => {
    bookingResult.value = value
  }

  const setOrder = (value: CreateOrderResponse) => {
    order.value = value
  }

  return {
    room,
    bookingResult,
    order,
    getRoom,
    setRoom,
    setBookingResult,
    setOrder,
    bookingDays: computed(() => {
      if (!bookingResult.value) {
        return 0
      }
      const { checkInDate, checkOutDate } = bookingResult.value
      return countDateDiffs({ start: checkInDate, end: checkOutDate })
    }),
  }
})
