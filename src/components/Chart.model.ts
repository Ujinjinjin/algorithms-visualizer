import type { EChartsOption } from 'echarts'

export type TChartOption = EChartsOption
export type TChartProps = {
  options: EChartsOption
  refresh?: boolean
}
