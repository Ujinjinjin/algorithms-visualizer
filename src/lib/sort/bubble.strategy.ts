import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class BubbleStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'selection'

  public async _sort(source: T[]): Promise<void> {
    for (let i = 1; i < source.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      for (let j = 0; j <= (source.length - i - 1); j++) {
        if (this.less(source[j + 1], source[j])) {
          await this.swap(source, j, j + 1)
        }
      }
    }
  }
}
