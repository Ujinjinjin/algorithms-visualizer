import type { ISortStrategy, TSortStrategyType } from '@/lib/sort/sort.model.ts'
import { numberComparisonFn, sleep } from '@/lib/utils.ts'
import { ref, type Ref } from 'vue'
import { SelectionSort } from '@/lib/sort/selection-sort.ts'

export function useSortStrategy(
  strategyType: TSortStrategyType,
  datasetRef: Ref<number[]>
) {
  let strategy: ISortStrategy<number>
  const updateCallback = async (source: number[]) => {
    await sleep(0)
    if (strategy?.isActive()) {
      datasetRef.value = [...source]
    }
  }
  switch (strategyType) {
    case 'selection':
      strategy = new SelectionSort(numberComparisonFn, updateCallback)
      break
    default:
      throw new Error(`Unknown sort strategy type: ${strategyType}`)
  }

  return ref(strategy!)
}
