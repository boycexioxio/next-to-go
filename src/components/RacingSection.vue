<script lang="ts" setup>
interface SectionProps {
  title: string
}
const props = defineProps<SectionProps>()
</script>

<template>
  <div class="my-5">
    <h2 class="font-bold text-2xl text-center">{{ props.title }}</h2>
    <div class="mt-10">
      <slot />
    </div>
  </div>
</template>
