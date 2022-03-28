<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import RacingIcon from './RacingIcon.vue'
import { Racing, Category } from '@/types/racing'
import useInterval from '@/compositions/use-interval'
import { countdown, Countdown, outdated } from '@/service/date'
import _ from 'lodash'

const store = useStore()

const categoryDataSource = computed<Record<string, Category>>(
  () => store.state.categoryDataSource
)
const categoryList = computed<Category[]>(() => store.getters.categoryList)
const selected = computed<string[]>(() => store.state.selectedCategoryIDList)

const toggleCategory = (id: string): void => {
  store.commit('toggleCategory', id)
}

const selectedRacingList = computed<Racing[]>(() => store.getters.racingList)
const racingList = ref<Racing[]>([])
const down = ref<Record<string, Countdown>>({})

const refreshRacingList = (): void => {
  const data = _.filter(
    _.sortBy(selectedRacingList.value, (item) => item.advertised_start.seconds),
    (item) => {
      const { seconds } = item.advertised_start

      const isOutdated = outdated(new Date(seconds * 1000), 60)

      return !isOutdated
    }
  )

  racingList.value = _.slice(data, 0, 5)
}

const refreshCountdown = (): void => {
  racingList.value.forEach((item) => {
    const { race_id, advertised_start } = item
    const { seconds } = advertised_start

    const result = countdown(new Date(seconds * 1000))

    down.value[race_id] = result
  })
}

watch(
  () => selectedRacingList.value,
  () => {
    refreshRacingList()
    refreshCountdown()
  }
)

useInterval(
  () => {
    refreshRacingList()
    refreshCountdown()
  },
  1000,
  true
)
</script>

<template>
  <div>
    <ul class="flex my-10 space-x-0.5 p-2 bg-gray-100">
      <li
        v-for="item in categoryList"
        :key="item.id"
        class="flex-1 flex justify-center py-2 border-b-8 bg-white cursor-pointer"
        :class="`${
          selected.includes(item.id) ? 'border-orange-600' : 'border-white'
        }`"
        @click="toggleCategory(item.id)"
      >
        <racing-icon :type="item.icon" />
      </li>
    </ul>
    <div
      class="divide-y divide-dashed overflow-hidden border-y"
      style="height: 344px"
    >
      <transition-group name="list">
        <div
          v-for="item in racingList"
          :key="item.race_id"
          class="flex items-center justify-between p-3 bg-gray-100"
        >
          <div class="flex item-center">
            <div class="mr-5">
              <racing-icon :type="categoryDataSource[item.category_id]?.icon" />
            </div>
            <div
              :class="
                down[item.race_id]?.style === 'danger'
                  ? 'text-gray-300'
                  : 'text-black'
              "
            >
              <h4 class="font-bold">
                {{ item.meeting_name }}
              </h4>
              <p class="text-sm">
                {{ item.venue_name }}, {{ item.venue_state }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <span
              class="font-bold"
              :class="
                down[item.race_id]?.style === 'info'
                  ? 'text-black'
                  : 'text-orange-600'
              "
              >{{ down[item.race_id]?.value || '' }}</span
            >
            <span
              class="block w-10 h-10 ml-5 leading-10 box-content rounded-full border-2 border-orange-600 text-center"
              >R{{ item.race_number }}</span
            >
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
