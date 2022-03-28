<script lang="ts" setup>
import horse from '@/assets/icons/horse.svg?raw'
import harness from '@/assets/icons/harness.svg?raw'
import greyhound from '@/assets/icons/greyhound.svg?raw'

interface Props {
  type: string
}

const props = defineProps<Props>()

const icons: Record<string, string> = {
  horse,
  harness,
  greyhound,
}
</script>

<template>
  <i class="text-gray-800" v-html="icons[props.type]"></i>
</template>
