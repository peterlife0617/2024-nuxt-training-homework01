interface RegisterRequest {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  address: {
    zipcode: string
    detail: string
  }
  nickname: string
}

interface RegisterResponse {
  message: string
  status: boolean
}

export function useRegister() {
  const isLoading = ref(false)

  const register = async (data: RegisterRequest) => {
    isLoading.value = true

    return await $fetch<RegisterResponse>('https://todolist-api.hexschool.io/users/sign_up', {
      method: 'POST',
      body: data,
    }).finally(() => {
      isLoading.value = false
    })
  }

  return {
    register,
  }
}
