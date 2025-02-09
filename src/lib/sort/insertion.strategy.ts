import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'insertion'

  public async _sort(source: T[]): Promise<void> {
    for (let i = 0; i < source.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      const t = source[i]
      let j = i
      while (j > 0 && this.less(t, source[j - 1])) {
        source[j] = source[j - 1]
        j--
        await this.updateCallbackFn(source)
      }
      source[j] = t
    }
  }
}
