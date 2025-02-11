import { sleep } from '@/lib/utils.ts'

export type CompareFn<T> = (a: T, b: T) => number
export type UpdateCallbackFn<T> = (source: T[]) => void

export type TSortStrategyType =
  | 'selection'
  | 'bubble'
  | 'insertion'
  | 'insertion-swap'
  | 'shell'
export type TSortStrategyStatus = 'idle' | 'sorting' | 'killed'

export interface IReadStats {
  readonly reads: number
  readonly writes: number
}

export interface IWriteStats {
  incrementReads(count?: number): void
  incrementWrites(count?: number): void
  reset(): void
}

export class SortStrategyStats implements IReadStats, IWriteStats {
  private _reads!: number
  private _writes!: number

  public constructor() {
    this.reset()
  }

  public get reads(): number {
    return this._reads
  }

  public incrementReads(count?: number): void {
    this._reads += count ?? 1
  }

  public get writes(): number {
    return this._writes
  }

  public incrementWrites(count?: number): void {
    this._writes += count ?? 1
  }

  public reset(): void {
    this._reads = 0
    this._writes = 0
  }
}

export interface ISortStrategy<T> {
  readonly stats: IReadStats
  readonly isActive: boolean
  sort(source: T[]): Promise<void>
  kill(): void
}

export class DelayedReader<T> {
  private readonly _stats: SortStrategyStats

  constructor(
    private readonly _source: T[]
  ) {
    this._stats = new SortStrategyStats()
  }

  public get length(): number {
    return this._source.length
  }

  public get source(): T[] {
    return this._source
  }

  public get stats(): IReadStats & IWriteStats {
    return this._stats
  }

  public async get(i: number): Promise<T> {
    this._stats.incrementReads()
    await sleep()
    return this._source[i]
  }

  public async set(i: number, value: T): Promise<void> {
    this._stats.incrementWrites()
    await sleep()
    this._source[i] = value
  }

  public async swap(i: number, j: number): Promise<void> {
    this._stats.incrementReads(2)
    this._stats.incrementWrites(2)
    await sleep()
    const temp = this._source[i]
    this._source[i] = this._source[j]
    this._source[j] = temp
  }
}

export abstract class SortBase<T> implements ISortStrategy<T> {
  protected status: TSortStrategyStatus = 'idle'
  protected source!: DelayedReader<T>

  public constructor(
    protected compareFn: CompareFn<T>,
    protected updateCallbackFn: UpdateCallbackFn<T>
  ) {
  }

  protected less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0
  }

  protected abortIfKilled(): void {
    if (this.status === 'killed') {
      throw new Error('Sort was aborted')
    }
  }

  public async sort(_source: T[]): Promise<void> {
    this.status = 'sorting' as TSortStrategyStatus
    this.source = new DelayedReader(_source)
    this.source.stats.reset()

    try {
      await this._sort()
    } catch (e) {

    }
    this.status = 'idle' as TSortStrategyStatus
  }

  public kill(): void {
    this.status = 'killed'
  }

  public get isActive(): boolean {
    return this.status === 'sorting'
  }

  public get stats(): IReadStats {
    return this.source?.stats ?? new SortStrategyStats()
  }

  abstract _sort(): Promise<void>
}
