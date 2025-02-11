/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IKillable, TStrategyStatus } from '@/lib/model.ts'

export const KillableMixin = <TBase extends new (...args: any[]) => Object>(Base: TBase) => {
  return class KillableMixin extends Base implements IKillable {
    protected status: TStrategyStatus = 'idle'

    protected abortIfKilled(): void {
      if (this.status === 'killed') {
        throw new Error('Sort was aborted')
      }
    }

    public kill(): void {
      this.status = 'killed'
    }

    public get isActive(): boolean {
      return this.status === 'running'
    }
  }
}
