import type { SweetAlertIcon } from 'sweetalert2'

export function useAlert() {
  const { $swal } = useNuxtApp()

  // 使用 sweetAlert2 套件顯示訊息
  // $swal.fire({
  //   position: "center",
  //   icon: ...,
  //   title: ...,
  //   showConfirmButton: false,
  //   timer: 1500,
  // });

  const alert = async (icon: SweetAlertIcon, title: string) => {
    $swal.fire({
      position: 'center',
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const success = async (title: string) => {
    alert('success', title)
  }

  const error = async (title: string) => {
    alert('error', title)
  }

  return {
    alert,
    success,
    error,
  }
}
