import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionStrategy<T> extends SortBase<T> {
  public type: TSortStrategyType = 'insertion'

  public async _sort(): Promise<void> {
    for (let i = 0; i < this.reader.length; i++) {
      if (this.status === 'killed') {
        this.status = 'idle'
        return
      }

      const t = await this.reader.get(i)
      let j = i
      while (j > 0 && this.less(t, await this.reader.get(j - 1))) {
        await this.reader.set(j, await this.reader.get(j - 1))
        j--
        this.updateCallbackFn(this.reader.source)
      }
      await this.reader.set(j, t)
    }
  }
}
