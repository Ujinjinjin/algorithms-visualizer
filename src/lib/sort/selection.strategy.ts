import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class SelectionStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 0; i < this.reader.length; i++) {
      let min = i
      for (let j = i; j < this.reader.length; j++) {
        this.abortIfKilled()
        if (this.less(await this.reader.get(j), await this.reader.get(min))) {
          min = j
        }
      }

      await this.reader.swap(i, min)
      this.updateCallbackFn(this.reader.source)
    }
  }
}
