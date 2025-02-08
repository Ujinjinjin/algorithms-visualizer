import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class SelectionStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'selection'

  public async _sort(source: T[]): Promise<void> {
    for (let i = 0; i < source.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      let min = i
      for (let j = i; j < source.length; j++) {
        if (this.less(source[j], source[min])) {
          min = j
        }
      }

      await this.swap(source, i, min)
    }
  }
}
