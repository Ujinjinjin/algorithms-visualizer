import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class SelectionStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'selection'

  public async _sort(): Promise<void> {
    for (let i = 0; i < this.reader.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      let min = i
      for (let j = i; j < this.reader.length; j++) {
        if (this.less(await this.reader.get(j), await this.reader.get(min))) {
          min = j
        }
      }

      await this.swap(i, min)
    }
  }
}
