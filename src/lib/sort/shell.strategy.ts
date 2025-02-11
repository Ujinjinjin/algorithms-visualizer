import { SortBase } from '@/lib/sort/sort.base.ts'

export class ShellStrategy<T> extends SortBase<T> {
  public async _sort(): Promise<void> {
    const N = this.source.length
    let h = 1
    while (h < N / 3) {
      h = 3 * h + 1
    }

    while (h >= 1) {
      for (let i = h; i < N; i++) {
        this.abortIfKilled()
        for (let j = i; j >= h && this.less(await this.source.get(j), await this.source.get(j - h)); j -= h) {
          await this.source.swap(j, j - h)
          this.updateCallbackFn(this.source.source)
        }
      }

      h = Math.floor(h / 3)
    }
  }
}
