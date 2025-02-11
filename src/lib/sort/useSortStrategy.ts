import type { ISortStrategy, TSortStrategyType } from '@/lib/sort/sort.model.ts'
import { numberComparisonFn } from '@/lib/utils.ts'
import { ref, type Ref } from 'vue'
import { SelectionStrategy } from '@/lib/sort/selection.strategy.ts'
import { BubbleStrategy } from '@/lib/sort/bubble.strategy.ts'
import { InsertionStrategy } from '@/lib/sort/insertion.strategy.ts'
import { InsertionSwapStrategy } from '@/lib/sort/insertion-swap.strategy.ts'
import { ShellStrategy } from '@/lib/sort/shell.strategy.ts'
import { MergeAscStrategy } from '@/lib/sort/merge-asc.strategy.ts'
import { MergeDescStrategy } from '@/lib/sort/merge-desc.strategy.ts'

export function useSortStrategy(
  strategyType: TSortStrategyType,
  datasetRef: Ref<number[]>
) {
  let strategy: ISortStrategy<number>
  const updateCallback = (source: number[]) => {
    if (strategy?.isActive) {
      datasetRef.value = [...source]
    }
  }
  switch (strategyType) {
    case 'selection':
      strategy = new SelectionStrategy(numberComparisonFn, updateCallback)
      break
    case 'bubble':
      strategy = new BubbleStrategy(numberComparisonFn, updateCallback)
      break
    case 'insertion':
      strategy = new InsertionStrategy(numberComparisonFn, updateCallback)
      break
    case 'insertion-swap':
      strategy = new InsertionSwapStrategy(numberComparisonFn, updateCallback)
      break
    case 'shell':
      strategy = new ShellStrategy(numberComparisonFn, updateCallback)
      break
    case 'merge-asc':
      strategy = new MergeAscStrategy(numberComparisonFn, updateCallback)
      break
    case 'merge-desc':
      strategy = new MergeDescStrategy(numberComparisonFn, updateCallback)
      break
    default:
      throw new Error(`Unknown sort strategy type: ${strategyType}`)
  }

  return ref(strategy!)
}
