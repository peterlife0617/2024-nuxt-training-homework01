export const useRoom = () => {
  const roomList = ref([]);
  const isLoading = ref(false);

  const getRooms = async () => {
    isLoading.value = true;

    try {
      const newsResponse = await fetch('https://nuxr3.zeabur.app/api/v1/rooms').then((res) => res.json())
      return newsResponse.result;
    } finally {
      isLoading.value = false;
    }

  }

  const getRoom = async (id: string) => {
    isLoading.value = true;

    try {
      if (!id) {
        return {};
      }
      const newsResponse = await fetch(`https://nuxr3.zeabur.app/api/v1/rooms/${id}`).then((res) => res.json())
      return newsResponse.result;
    } finally {
      isLoading.value = false;
    }

  }


  return {
    roomList,
    isLoading,
    getRooms,
    getRoom
  }
}
