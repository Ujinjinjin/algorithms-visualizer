import { onUnmounted } from 'vue'
import type { TMessageHandler, TMessageKey } from '@/stores/messages/messages.model'
import { useMessageStore } from '@/stores/messages/messages.store'

export function useMessageHandler<T extends TMessageKey>(
  key: T,
  handler: TMessageHandler<T>
): void {
  const messageStore = useMessageStore()

  messageStore.on(key, handler)

  onUnmounted(() => {
    messageStore.off(key, handler)
  })
}
