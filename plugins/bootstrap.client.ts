import { Modal, Offcanvas } from 'bootstrap'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal: Modal,
      offcanvas: Offcanvas,
    },
  }
})
