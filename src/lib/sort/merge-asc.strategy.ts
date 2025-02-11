import { SortBase } from '@/lib/sort/sort.base.ts'
import type { IMergeStrategy } from '@/lib/merge/merge.model.ts'
import { OnSpotMergeStrategy } from '@/lib/merge/on-spot-merge.strategy.ts'

export class MergeAscStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    const merger: IMergeStrategy<T> = new OnSpotMergeStrategy(
      this.compareFn,
      this.updateCallbackFn,
      this.source.length,
      this._stats,
    )
    const n = this.source.length

    for (let sz = 1; sz < n; sz *= 2)
    {
      for (let lo = 0; lo < n - sz; lo += sz * 2)
      {
        await merger.merge(this.source, lo, lo + sz - 1, Math.min(lo + sz * 2 - 1, n - 1));
      }
    }
  }
}
