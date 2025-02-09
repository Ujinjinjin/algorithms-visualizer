import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class BubbleStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    for (let i = 1; i < this.reader.length; i++) {
      for (let j = 0; j <= (this.reader.length - i - 1); j++) {
        this.abortIfKilled()

        if (this.less(await this.reader.get(j + 1), await this.reader.get(j))) {
          await this.reader.swap(j, j + 1)
          this.updateCallbackFn(this.reader.source)
        }
      }
    }
  }
}
