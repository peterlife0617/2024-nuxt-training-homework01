interface Todo {
  id: string
  createTime: number
  content: string
  status: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const { public: {
    apiUrl,
  } } = useRuntimeConfig()
  const todoList = ref<Todo[]>([])
  const isFetch = ref(false)

  //  在伺服器端取得 todo 列表
  const getTodoOnServer = async (token: string) => {
    await useAsyncData('getTodoList', async () => {
      const { data } = await $fetch<{ data: any }>(
        '/todos',
        {
          baseURL: apiUrl,
          headers: { Authorization: token },
        },
      )
      todoList.value = data
      return data
    })
  }

  // 新增待辦事項 ( 客戶端操作 )
  const addTodo = async (content: string, token: string) => {
    isFetch.value = true
    try {
      const addResponse = await $fetch<{
        status: true
        newTodo: Todo
      } | {
        status: false
      }>(
        '/todos',
        {
          baseURL: apiUrl,
          method: 'POST',
          headers: { Authorization: token },
          body: { content },
        },
      )
      /*
      newTodo 為新增的待辦事項，格式如下
      {
        "id",
        "createTime,
        "content",
        "status":
      }
      */

      if (addResponse.status) {
        todoList.value.push(addResponse.newTodo)
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      isFetch.value = false
    }
  }

  // 刪除待辦事項 ( 客戶端操作 )
  const removeTodo = async (id: string, cookie: string) => {
    const todoIndex = todoList.value.findIndex(todo => todo.id === id)
    isFetch.value = true
    try {
      await $fetch(`/todos/${id}`, {
        baseURL: apiUrl,
        method: 'DELETE',
        headers: { Authorization: cookie },
      })
      todoList.value.splice(todoIndex, 1)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      isFetch.value = false
    }
  }
  return {
    todoList,
    isFetch,
    getTodoOnServer,
    addTodo,
    removeTodo,
  }
})
