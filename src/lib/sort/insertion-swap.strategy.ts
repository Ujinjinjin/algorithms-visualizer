import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionSwapStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'insertion-swap'

  public async _sort(): Promise<void> {
    for (let i = 0; i < this.reader.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      for (let j = i; j > 0 && this.less(await this.reader.get(j), await this.reader.get(j - 1)); j--) {
        await this.swap(j, j - 1)
      }
    }
  }
}
