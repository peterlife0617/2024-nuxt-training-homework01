import type { BookingResult } from '~/models/order'
import type { Room } from '~/models/room'

export const useBookingStore = defineStore('booking', () => {
  const { public: {
    apiUrl,
  } } = useRuntimeConfig()

  // 訂單資訊的格式
  const bookingResult = ref<BookingResult>(null)

  const selectedRoom = ref<Room | null>(null)

  const setSelectedRoom = (room: Room | null) => {
    selectedRoom.value = room
  }

  const getRoom = async (id: string) => {
    const response = await $fetch<{ status: true, result: Room } | { status: false, message: string }>(`/rooms/${id}`, {
      baseURL: apiUrl,
    })

    if (response.status) {
      return response.result
    }
    return null
  }

  const setRoomOnServer = async (id: string) => {
    await useAsyncData('set-room-data', async () => {
      const room = await getRoom(id)
      setSelectedRoom(room)
      return true
    })
  }

  return {
    bookingResult,
    selectedRoom,
    setRoomOnServer,
  }
})
