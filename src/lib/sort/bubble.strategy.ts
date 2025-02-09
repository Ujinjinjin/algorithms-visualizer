import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class BubbleStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'selection'

  public async _sort(): Promise<void> {
    for (let i = 1; i < this.reader.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      for (let j = 0; j <= (this.reader.length - i - 1); j++) {
        if (this.less(await this.reader.get(j + 1), await this.reader.get(j))) {
          await this.swap(j, j + 1)
        }
      }
    }
  }
}
