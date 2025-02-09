import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class InsertionStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 0; i < this.reader.length; i++) {
      const t = await this.reader.get(i)
      let j = i
      while (j > 0 && this.less(t, await this.reader.get(j - 1))) {
        this.abortIfKilled()
        await this.reader.set(j, await this.reader.get(j - 1))
        j--
        this.updateCallbackFn(this.reader.source)
      }
      await this.reader.set(j, t)
    }
  }
}
