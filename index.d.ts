import type { Directive } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    vTextformat: Directive<any, string, any, 'uppercase' | 'lowercase'>
    vTimeformat: Directive
  }
}

export { }
