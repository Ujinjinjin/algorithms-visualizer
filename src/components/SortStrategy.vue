<script setup lang="ts">
import Chart from '@/components/Chart.vue'
import { computed, type ComputedRef, ref, type Ref } from 'vue'
import type { TChartOption } from '@/components/Chart.model.ts'
import type { TSortStrategyProps } from '@/components/SortStrategy.model.ts'
import type { ISortStrategy } from '@/lib/sort/sort.model.ts'
import { useSortStrategy } from '@/lib/sort/useSortStrategy.ts'
import { useMessageHandler } from '@/lib/messages/useMessageHadler.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const props = defineProps<TSortStrategyProps>()

const dataset: Ref<number[]> = ref([])
const chartOptions: ComputedRef<TChartOption> = computed(() => {
  return {
    animation: false,
    grid: {
      top: 4,
      bottom: 4,
      right: 16,
      left: 16,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: dataset.value,
        type: 'bar'
      }
    ]
  } as TChartOption
})
const strategy: Ref<ISortStrategy<number>> = useSortStrategy(props.strategy, dataset)

useMessageHandler('sort', async () => {
  if (!strategy.value.isActive) {
    await strategy.value.sort([...dataset.value])
  }
})
useMessageHandler('reset', async (payload) => {
  strategy.value.kill()
  dataset.value = [...payload.source]
})
</script>

<template>
  <div class="flex flex-col gap-2 border py-4">
    <h3 class="place-self-center text-xl font-bold pb-2">{{title}}</h3>
    <Chart :options="chartOptions" class="w-full h-full" />
    <div class="grid grid-cols-2 gap-2">
      <p class="place-self-center">Read: {{strategy.stats.reads}}</p>
      <p class="place-self-center">Writes: {{strategy.stats.writes}}</p>
    </div>
  </div>
</template>
