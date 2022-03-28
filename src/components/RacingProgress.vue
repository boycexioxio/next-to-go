<script lang="ts" setup>
import { computed } from 'vue'
interface ProgressProps {
  value: number
  text: string
}

const props = defineProps<ProgressProps>()

const offset = computed<number>(() => {
  return 300 * (1 - props.value / 100)
})
</script>

<template>
  <div class="progress">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style="color: #0071eb"
      width="40px"
      height="40px"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke-width="6"
        fill="none"
        stroke="#c8d2e6"
      ></circle>
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke-width="6"
        fill="none"
        stroke="currentColor"
        stroke-dasharray="300"
        :stroke-dashoffset="offset"
        style="transform-origin: center; transform: rotate(-90deg)"
      ></circle>
      <text
        font-size="40"
        fill="#fff"
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ props.text }}
      </text>
    </svg>
  </div>
</template>

<style>
.progress {
  font-size: 0;
}
</style>
