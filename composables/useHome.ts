export const useHome = () => {
  const newsList = ref([]);
  const isLoading = ref(false);

  const getNews = async () => {
    isLoading.value = true;

    try {
      const newsResponse = await fetch('https://nuxr3.zeabur.app/api/v1/home/news/').then((res) => res.json())
      return newsResponse.result;
    } finally {
      isLoading.value = false;
    }

  }

  return {
    newsList,
    isLoading,
    getNews,
  }
}
