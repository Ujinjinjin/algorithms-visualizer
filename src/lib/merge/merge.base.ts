import type { IMergeStrategy } from '@/lib/merge/merge.model.ts'
import type { CompareFn, UpdateCallbackFn } from '@/lib/sort/sort.model.ts'
import type { IReadStats, ISourceWrapper, IWriteStats, TStrategyStatus } from '@/lib/model.ts'
import { KillableMixin } from '@/lib/mixins/killable.mixin.ts'
import { DelayedReader } from '@/lib/utils.ts'
import { StatsMixin } from '@/lib/mixins/stats.mixin.ts'

const MergeMixin = KillableMixin(StatsMixin(Object))

export abstract class MergeBase<T> extends MergeMixin implements IMergeStrategy<T> {
  protected source!: ISourceWrapper<T>
  protected buffer!: ISourceWrapper<T>

  public constructor(
    protected compareFn: CompareFn<T>,
    protected updateCallbackFn: UpdateCallbackFn<T>,
    bufferSize: number,
    stats?: IReadStats & IWriteStats
  ) {
    super()
    this._stats = stats ?? this._stats
    this.buffer = new DelayedReader(new Array(bufferSize), this._stats)
  }

  protected less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0
  }

  public async merge(
    source: ISourceWrapper<T>,
    lo: number,
    mid: number,
    hi: number,
  ): Promise<void> {
    this.status = 'running' as TStrategyStatus
    this.source = source

    try {
      await this._merge(
        lo,
        mid,
        hi)
    } catch (e) {

    }
    this.status = 'idle' as TStrategyStatus
  }

  protected abstract _merge(lo: number, mid: number, hi: number): Promise<void>
}
