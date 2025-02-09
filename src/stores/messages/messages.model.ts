export type TResetPayload = {
  source: number[]
}
export type TEmptyPayload = {}

export type TMessagePayload = {
  sort: TEmptyPayload
  reset: TResetPayload
}

export type TMessageKey = keyof TMessagePayload

export type TMessage<T extends TMessageKey> = {
  key: TMessageKey
  payload: TMessagePayload[T]
}

export type TMessageHandler<T extends TMessageKey> = (payload: TMessagePayload[T]) => Promise<void>
