export function useRoom() {
  const roomList = ref([])
  const isLoading = ref(false)

  const getRooms = async () => {
    isLoading.value = true

    try {
      const newsResponse = await fetch('https://nuxr3.zeabur.app/api/v1/rooms').then(async res => res.json() as Promise<{ result: Record<string, any>[] }>)
      return newsResponse.result
    }
    finally {
      isLoading.value = false
    }
  }

  const getRoom = async (id: string | string[]) => {
    isLoading.value = true
    const roomId = id.toString()

    try {
      if (!id) {
        return null
      }
      const newsResponse = await fetch(`https://nuxr3.zeabur.app/api/v1/rooms/${roomId}`).then(async res => res.json() as Promise<{ result: Record<string, any> }>)
      return newsResponse.result
    }
    catch (e) {
      console.error(e)
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    roomList,
    isLoading,
    getRooms,
    getRoom,
  }
}
