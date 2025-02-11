import type {
  CompareFn,
  ISortStrategy,
  UpdateCallbackFn
} from '@/lib/sort/sort.model.ts'
import { DelayedReader } from '@/lib/utils.ts'
import type { ISourceWrapper, TStrategyStatus } from '@/lib/model.ts'
import { KillableMixin } from '@/lib/mixins/killable.mixin.ts'
import { StatsMixin } from '@/lib/mixins/stats.mixin.ts'

const SortMixin = KillableMixin(StatsMixin(Object))

export abstract class SortBase<T> extends SortMixin implements ISortStrategy<T> {
  protected source!: ISourceWrapper<T>

  public constructor(
    protected compareFn: CompareFn<T>,
    protected updateCallbackFn: UpdateCallbackFn<T>
  ) {
    super()
  }

  protected less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0
  }

  public async sort(_source: T[]): Promise<void> {
    this.status = 'running' as TStrategyStatus
    this.source = new DelayedReader(_source, this._stats)

    try {
      await this._sort()
    } catch (e) {

    }
    this.status = 'idle' as TStrategyStatus
  }

  protected abstract _sort(): Promise<void>
}
