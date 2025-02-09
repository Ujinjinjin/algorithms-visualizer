import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionSwapStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'insertion-swap'

  public async _sort(source: T[]): Promise<void> {
    for (let i = 0; i < source.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      for (let j = i; j > 0 && this.less(source[j], source[j - 1]); j--) {
        await this.swap(source, j, j - 1)
      }
    }
  }
}
