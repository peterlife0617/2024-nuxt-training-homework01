export function useHome() {
  const newsList = ref([])
  const isLoading = ref(false)

  const getNews = async () => {
    isLoading.value = true

    try {
      const newsResponse = await fetch('https://nuxr3.zeabur.app/api/v1/home/news/').then(async res => res.json() as Promise<{ result: Record<string, any>[] }>)
      return newsResponse.result
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    newsList,
    isLoading,
    getNews,
  }
}
