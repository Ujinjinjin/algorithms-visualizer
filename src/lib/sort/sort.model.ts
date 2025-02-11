import type { IHaveStats, IKillable, IReadStats } from '@/lib/model.ts'

export type CompareFn<T> = (a: T, b: T) => number
export type UpdateCallbackFn<T> = (source: T[]) => void

export type TSortStrategyType =
  | 'selection'
  | 'bubble'
  | 'insertion'
  | 'insertion-swap'
  | 'shell'
  | 'merge-asc'
  | 'merge-desc'

export interface ISortStrategy<T> extends IKillable, IHaveStats {
  readonly stats: IReadStats
  sort(source: T[]): Promise<void>
}
