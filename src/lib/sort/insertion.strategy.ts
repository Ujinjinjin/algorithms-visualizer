import { SortBase } from '@/lib/sort/sort.base.ts'

export class InsertionStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 0; i < this.source.length; i++) {
      const t = await this.source.get(i)
      let j = i
      while (j > 0 && this.less(t, await this.source.get(j - 1))) {
        this.abortIfKilled()
        await this.source.set(j, await this.source.get(j - 1))
        j--
        this.updateCallbackFn(this.source.source)
      }
      await this.source.set(j, t)
    }
  }
}
