import { MergeBase } from '@/lib/merge/merge.base.ts'

export class OnSpotMergeStrategy<T> extends MergeBase<T>{
  protected async _merge(lo: number, mid: number, hi: number): Promise<void> {
    for (let k = lo; k <= hi; k++) {
      this.abortIfKilled()
      await this.buffer.set(k, await this.source.get(k))
    }

    let i = lo
    let j = mid + 1

    for (let k = lo; k <= hi; k++) {
      this.abortIfKilled()
      if (i > mid) {
        await this.source.set(k, await this.buffer.get(j++))
      } else if (j > hi) {
        await this.source.set(k, await this.buffer.get(i++))
      } else if (this.less(await this.buffer.get(j), await this.buffer.get(i))) {
        await this.source.set(k, await this.buffer.get(j++))
      } else {
        await this.source.set(k, await this.buffer.get(i++))
      }

      this.updateCallbackFn(this.source.source)
    }
  }
}
