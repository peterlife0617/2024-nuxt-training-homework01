<script setup lang="ts">
definePageMeta({
  middleware: ['auto-login'],
})

const cookie = useCookie('todo-auth')

const { todoList, isFetch } = storeToRefs(useTodoStore())
const { getTodoOnServer, addTodo, removeTodo } = useTodoStore()

// 在伺服器端初始化資料，傳遞給客戶端。
if (cookie.value) {
  const token = cookie.value
  await useAsyncData('todos', () => getTodoOnServer(token).then(() => true))
}

const newTodo = ref('')

// 點擊後，透過 todoStore 的 addTodo 方法將新增代辦事項
function addNewTodo() {
  if (newTodo.value && cookie.value) {
    addTodo(newTodo.value, cookie.value)
    newTodo.value = ''
  }
}

// 移除 Todo
function deleteTodo(id: string) {
  if (cookie.value) {
    removeTodo(id, cookie.value)
  }
}
</script>

<template>
  <div class="input-group mb-3">
    <input
      v-model.trim="newTodo"
      class="form-control"
      placeholder="新增待辦事項"
    >
    <button
      class="btn btn-primary"
      :disabled="!newTodo.length || isFetch"
      @click="addNewTodo"
    >
      新增 Todo
    </button>
  </div>
  <ul class="list-group">
    <li
      v-for="todo in todoList"
      :key="todo.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>
        {{ todo.content }}
      </span>
      <button
        class="btn btn-danger btn-sm"
        :disabled="isFetch"
        @click="deleteTodo(todo.id)"
      >
        刪除
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
</style>
