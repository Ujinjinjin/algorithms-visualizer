import type { IHaveStats, IKillable, ISourceWrapper } from '@/lib/model.ts'

export interface IMergeStrategy<T> extends IKillable, IHaveStats
{
  merge(source: ISourceWrapper<T>, lo: number, mid: number, hi: number): Promise<void>
}
