import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class BubbleStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 1; i < this.source.length; i++) {
      for (let j = 0; j <= (this.source.length - i - 1); j++) {
        this.abortIfKilled()

        if (this.less(await this.source.get(j + 1), await this.source.get(j))) {
          await this.source.swap(j, j + 1)
          this.updateCallbackFn(this.source.source)
        }
      }
    }
  }
}
