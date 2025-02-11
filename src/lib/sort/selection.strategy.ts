import { SortBase } from '@/lib/sort/sort.base.ts'

export class SelectionStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 0; i < this.source.length; i++) {
      let min = i
      for (let j = i; j < this.source.length; j++) {
        this.abortIfKilled()
        if (this.less(await this.source.get(j), await this.source.get(min))) {
          min = j
        }
      }

      await this.source.swap(i, min)
      this.updateCallbackFn(this.source.source)
    }
  }
}
