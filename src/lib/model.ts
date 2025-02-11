export type TShirtSize = 'XS' | 'S' | 'M' | 'L'
export type TStrategyStatus = 'idle' | 'running' | 'killed'

export interface IReadStats {
  readonly reads: number
  readonly writes: number
}

export interface IWriteStats {
  incrementReads(count?: number): void
  incrementWrites(count?: number): void
  reset(): void
}

export interface ISourceWrapper<T> {
  readonly length: number
  readonly source: T[]

  get(i: number): Promise<T>
  set(i: number, value: T): Promise<void>
  swap(i: number, j: number): Promise<void>
}

export interface IKillable {
  readonly isActive: boolean
  kill(): void
}

export interface IHaveStats {
  readonly stats: IReadStats
}
