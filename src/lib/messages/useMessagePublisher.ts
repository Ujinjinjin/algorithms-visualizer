import type { TMessageKey, TMessagePayload } from '@/stores/messages/messages.model'
import { useMessageStore } from '@/stores/messages/messages.store'

export function useMessagePublisher() {
  return {
    publish: <T extends TMessageKey>(key: T, payload?: TMessagePayload[T]) => useMessageStore().publish(key, payload)
  }
}
