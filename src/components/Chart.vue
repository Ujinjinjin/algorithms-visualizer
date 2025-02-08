<script setup lang="ts">
import * as echarts from 'echarts'
import { nanoid } from 'nanoid'
import { onMounted, type Ref, ref, watch } from 'vue'
import type { TChartProps } from './Chart.model.ts'

const props = defineProps<TChartProps>()

const chartContainer: Ref<HTMLElement | undefined> = ref()
const chartId: string = `chart-container-${nanoid(8)}`
let chart: echarts.ECharts | undefined = undefined

onMounted(() => {
  if (!chartContainer.value) {
    return
  }

  chart = echarts.init(chartContainer.value, null, { renderer: 'svg' })
  chart.setOption(props.options)
})

watch(props, () => {
  if (chart) {
    props.refresh && chart.clear()
    chart.setOption(props.options)
  }
})
</script>

<template>
  <div :id="chartId" ref="chartContainer" />
</template>
