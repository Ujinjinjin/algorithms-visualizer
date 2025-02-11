import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { IReadStats, ISourceWrapper, IWriteStats } from '@/lib/model.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function generateDataset(length: number): number[] {
  return Array.from({ length }, (_, i) => Math.random() * 100 * length)
}

export const numberComparisonFn = (a: number, b: number) => a - b

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

export class DelayedReader<T> implements ISourceWrapper<T>{
  constructor(
    private readonly _source: T[],
    private readonly _stats: IWriteStats
  ) {
  }

  public get length(): number {
    return this._source.length
  }

  public get source(): T[] {
    return this._source
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
