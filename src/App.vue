<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import RacingHeader from '@/components/RacingHeader.vue'
import RacingSection from '@/components/RacingSection.vue'
import RacingTable from '@/components/RacingTable.vue'
import RacingProgress from '@/components/RacingProgress.vue'
import useInterval from '@/compositions/use-interval'
import { format } from '@/service/date'

const store = useStore()

// Handle count down and render seconds
// Refresh the rate list every 60 seconds
const refreshCountdown = ref<number>(0)
const countdownPercentage = computed<number>(() => {
  return Math.round((refreshCountdown.value / 60) * 100)
})
const lastUpdatedAt = computed<string>(() => {
  const date = store.state.lastUpdatedAt

  if (!date) {
    return ''
  }

  return format(date)
})

useInterval(
  () => {
    if (refreshCountdown.value <= 0) {
      store
        .dispatch('refreshRacingList')
        .then(() => {
          store.commit('setError', undefined)
        })
        .catch((err: Error) => {
          store.commit('setError', err.message)
        })

      refreshCountdown.value = 60
    }

    refreshCountdown.value -= 1
  },
  1000,
  true
)

const hasError = computed<boolean>(() => {
  return !!store.state.error
})
</script>

<template>
  <div>
    <racing-header />
    <div class="xl:w-1/2 mx-auto my-20 px-10">
      <racing-section :title="$t('sectionTitle')">
        <racing-table />
      </racing-section>
    </div>
    <div
      class="flex items-center justify-between px-10 py-16 text-gray-400 bg-gray-800"
    >
      <div class="flex items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path
            d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linejoin="round"
          />
          <path
            d="M16 24L22 30L34 18"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="ml-2">Must be 18+</span>
      </div>
      <div v-show="lastUpdatedAt" class="flex items-center">
        <div class="mr-5">
          <racing-progress
            :value="countdownPercentage"
            :text="`${refreshCountdown + 1}`"
          />
        </div>
        <div>
          {{ $t('lastUpdate') }}
          {{ lastUpdatedAt }}
        </div>
      </div>
    </div>
    <div v-show="hasError" class="error-message">
      {{ $t('tips') }}
    </div>
  </div>
</template>
