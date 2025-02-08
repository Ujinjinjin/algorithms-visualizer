export type CompareFn<T> = (a: T, b: T) => number
export type DelayFn<T> = (source: T[]) => Promise<void>

export type TSortStrategyType = 'selection' | 'bubble'
export type TSortStrategyStatus = 'idle' | 'sorting' | 'killed'

export interface ISortStrategy<T> {
  type: TSortStrategyType
  sort(source: T[]): Promise<void>
  kill(): void
  isActive(): boolean
}

export abstract class SortBase<T> implements ISortStrategy<T> {
  protected status: TSortStrategyStatus = 'idle'

  public constructor(
    protected compareFn: CompareFn<T>,
    protected updateCallbackFn: DelayFn<T>
  ) {
  }

  protected less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0
  }

  protected async swap(source: T[], i: number, j: number): Promise<void> {
    const temp = source[i]
    source[i] = source[j]
    source[j] = temp

    await this.updateCallbackFn(source)
  }

  public async sort(source: T[]): Promise<void> {
    this.status = 'sorting' as TSortStrategyStatus
    await this._sort(source)
  }

  public kill(): void {
    this.status = 'killed'
  }

  public isActive(): boolean {
    return this.status === 'sorting'
  }

  abstract type: TSortStrategyType
  abstract _sort(source: T[]): Promise<void>
}
