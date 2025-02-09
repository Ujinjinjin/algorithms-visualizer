import {
  SortBase,
  type TSortStrategyType
} from '@/lib/sort/sort.model.ts'

export class ShellStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    const N = this.reader.length
    let h = 1
    while (h < N / 3) {
      h = 3 * h + 1
    }

    while (h >= 1) {
      for (let i = h; i < N; i++) {
        this.abortIfKilled()
        for (let j = i; j >= h && this.less(await this.reader.get(j), await this.reader.get(j - h)); j -= h) {
          await this.reader.swap(j, j - h)
          this.updateCallbackFn(this.reader.source)
        }
      }

      h = Math.floor(h / 3)
    }
  }
}
