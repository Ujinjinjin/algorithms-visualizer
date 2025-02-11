/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IHaveStats, IReadStats, IWriteStats } from '@/lib/model.ts'
import { SortStrategyStats } from '@/lib/utils.ts'

export const StatsMixin = <TBase extends new (...args: any[]) => Object>(Base: TBase) => {
  return class StatsMixin extends Base implements IHaveStats {
    protected _stats: IReadStats & IWriteStats = new SortStrategyStats()

    public get stats(): IReadStats {
      return this._stats
    }
  }
}
