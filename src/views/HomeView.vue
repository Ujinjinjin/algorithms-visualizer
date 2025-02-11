<script setup lang="ts">
import SortStrategy from '@/components/SortStrategy.vue'
import { Button } from '@/components/ui/button'
import { generateDataset } from '@/lib/utils.ts'
import { useMessagePublisher } from '@/lib/messages/useMessagePublisher.ts'
import { computed, type ComputedRef, onMounted, type Ref, ref, watch } from 'vue'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { TShirtSize } from '@/lib/model.ts'
import { PlayIcon, ArrowPathIcon } from '@heroicons/vue/16/solid'

const { publish } = useMessagePublisher()

const datasourceSize: Ref<TShirtSize> = ref('S')
const datasource: ComputedRef<number[]> = computed(() => {
  let size: number
  switch (datasourceSize.value) {
    case 'XS':
      size = 10
      break
    case 'S':
      size = 50
      break
    case 'M':
      size = 100
      break
    case 'L':
      size = 500
      break
  }
  return generateDataset(size)
})

watch(datasource, () => {
  reset()
})
onMounted(() => {
  reset()
})
function reset() {
  publish('reset', { source: datasource.value })
}
function sort() {
  publish('sort')
}
</script>

<template>
  <main>
    <div class="grid grid-cols-10">
      <div class="place-self-center flex flex-col gap-2 col-span-1 w-full px-3">
        <Select default-value="S" v-model="datasourceSize">
          <SelectTrigger>
            <SelectValue placeholder="Dataset size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XS">Tiny</SelectItem>
            <SelectItem value="S">Small</SelectItem>
            <SelectItem value="M">Medium</SelectItem>
            <SelectItem value="L">Large</SelectItem>
          </SelectContent>
        </Select>
        <Button @click="sort"><PlayIcon/> Sort</Button>
        <Button @click="reset" variant="destructive"><ArrowPathIcon/> Reset</Button>
      </div>
      <div class="col-span-9">
        <h2 class="place-self-center text-2xl py-4">Items: {{datasource.length}}</h2>
        <div class="grid grid-cols-3">
          <SortStrategy title="Bubble" strategy="bubble" class="w-full h-96"/>
          <SortStrategy title="Selection" strategy="selection" class="w-full h-96"/>
          <SortStrategy title="Insertion" strategy="insertion" class="w-full h-96"/>
          <SortStrategy title="Insertion Swap" strategy="insertion-swap" class="w-full h-96"/>
          <SortStrategy title="Shell" strategy="shell" class="w-full h-96"/>
          <SortStrategy title="Merge (Asc)" strategy="merge-asc" class="w-full h-96"/>
          <SortStrategy title="Merge (Desc)" strategy="merge-desc" class="w-full h-96"/>
        </div>
      </div>
    </div>
  </main>
</template>
