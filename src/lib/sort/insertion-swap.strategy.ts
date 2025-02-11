import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionSwapStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 0; i < this.source.length; i++) {
      for (let j = i; j > 0 && this.less(await this.source.get(j), await this.source.get(j - 1)); j--) {
        this.abortIfKilled()
        await this.source.swap(j, j - 1)
        this.updateCallbackFn(this.source.source)
      }
    }
  }
}
