import mitt from 'mitt'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TMessageHandler, TMessageKey, TMessagePayload } from '@/stores/messages/messages.model'

export const useMessageStore = defineStore('message-broker', () => {
  const emitter = ref(mitt())

  function publish<T extends TMessageKey>(key: T, payload?: TMessagePayload[T]): void {
    emitter.value.emit(key, payload)
  }

  function on<T extends TMessageKey>(key: T, handler: TMessageHandler<T>): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emitter.value.on(key, handler as any)
  }

  function off<T extends TMessageKey>(key: T, handler: TMessageHandler<T>): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emitter.value.off(key, handler as any)
  }

  return { publish, on, off }
})
