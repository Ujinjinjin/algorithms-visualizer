<script setup lang="ts">
import SortStrategy from '@/components/SortStrategy.vue'
import { Button } from '@/components/ui/button'
import { generateDataset } from '@/lib/utils.ts'
import { useMessagePublisher } from '@/lib/messages/useMessagePublisher.ts'
import { onMounted } from 'vue'

const { publish } = useMessagePublisher()

onMounted(() => {
  publish('reset', { source: generateDataset(500) })
})

function sort() {
  publish('sort')
}

function reset() {
  publish('reset', { source: generateDataset(500) })
}
</script>

<template>
  <main>
    <SortStrategy title="Selection Sort" strategy="selection" class="w-full h-96"/>
    <SortStrategy title="Selection Sort" strategy="selection" class="w-full h-96"/>
    <div class="place-self-center flex gap-2">
      <Button @click="sort">Sort</Button>
      <Button @click="reset">Reset</Button>
    </div>
  </main>
</template>
