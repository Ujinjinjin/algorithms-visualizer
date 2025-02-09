import { sleep } from '@/lib/utils.ts'

export type CompareFn<T> = (a: T, b: T) => number
export type UpdateCallbackFn<T> = (source: T[]) => void

export type TSortStrategyType = 'selection' | 'bubble' | 'insertion' | 'insertion-swap'
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
  readonly type: TSortStrategyType
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
  protected reader!: DelayedReader<T>

  public constructor(
    protected compareFn: CompareFn<T>,
    protected updateCallbackFn: UpdateCallbackFn<T>
  ) {
  }

  protected less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0
  }

  protected async swap(i: number, j: number): Promise<void> {
    await this.reader.swap(i, j)
    this.updateCallbackFn(this.reader.source)
  }

  public async sort(source: T[]): Promise<void> {
    this.status = 'sorting' as TSortStrategyStatus
    this.reader = new DelayedReader(source)
    this.reader.stats.reset()
    await this._sort()
  }

  public kill(): void {
    this.status = 'killed'
  }

  public get isActive(): boolean {
    return this.status === 'sorting'
  }

  public get stats(): IReadStats {
    return this.reader?.stats ?? new SortStrategyStats()
  }

  abstract type: TSortStrategyType
  abstract _sort(): Promise<void>
}
