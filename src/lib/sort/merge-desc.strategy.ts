import { SortBase } from '@/lib/sort/sort.base.ts'
import type { IMergeStrategy } from '@/lib/merge/merge.model.ts'
import { OnSpotMergeStrategy } from '@/lib/merge/on-spot-merge.strategy.ts'

export class MergeDescStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    const merger: IMergeStrategy<T> = new OnSpotMergeStrategy(
      this.compareFn,
      this.updateCallbackFn,
      this.source.length,
      this._stats,
    )
    await this._mergeSort(merger, 0, this.source.length - 1)
  }

  private async _mergeSort(
    merger: IMergeStrategy<T>,
    lo: number,
    hi: number,
  ): Promise<void> {
    if (hi <= lo) return

    const mid = lo + Math.floor((hi - lo) / 2)
    await this._mergeSort(merger, lo, mid)
    await this._mergeSort(merger, mid + 1, hi)

    await merger.merge(this.source, lo, mid, hi)
  }
}
