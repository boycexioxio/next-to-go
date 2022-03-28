import { InjectionKey } from 'vue'
import { Store, useStore as baseUseStore, createStore } from 'vuex'
import _ from 'lodash'
import { Category, Racing } from '@/types/racing'
import { getRacingList } from '@/service/racing'

interface RacingMetaData {
  idList: string[]
  dataSource: Record<string, Racing>
}

export interface State {
  allRacingIDList: string[]
  racingDataSource: Record<string, Racing>
  categoryDataSource: Record<string, Category>
  selectedCategoryIDList: string[]
  lastUpdatedAt?: Date
  error?: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      allRacingIDList: [],
      racingDataSource: {},
      categoryDataSource: {
        '4a2788f8-e825-4d36-9894-efd4baf1cfae': {
          id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
          icon: 'horse',
        },
        '161d9be2-e909-4326-8c2c-35ed71fb460b': {
          id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
          icon: 'greyhound',
        },
        '9daef0d7-bf3c-4f50-921d-8e818c60fe61': {
          id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
          icon: 'harness',
        },
      },
      selectedCategoryIDList: [
        '4a2788f8-e825-4d36-9894-efd4baf1cfae',
        '161d9be2-e909-4326-8c2c-35ed71fb460b',
        '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      ],
      lastUpdatedAt: undefined,
      error: undefined,
    }
  },
  getters: {
    categoryList(state) {
      return _.values(state.categoryDataSource)
    },
    racingList(state): Racing[] {
      return _.filter(
        _.map(state.allRacingIDList, (item) => state.racingDataSource[item]),
        (item) => {
          return _.includes(state.selectedCategoryIDList, item.category_id)
        }
      )
    },
  },
  mutations: {
    setAllRacingList(state, payload: RacingMetaData) {
      state.allRacingIDList = payload.idList
      state.racingDataSource = _.assign(
        {},
        state.racingDataSource,
        payload.dataSource
      )
    },
    setUpdateTime(state, value: Date | undefined) {
      state.lastUpdatedAt = value
    },
    setError(state, error: string | undefined) {
      state.error = error
    },
    toggleCategory(state, id: string) {
      const index = state.selectedCategoryIDList.indexOf(id)

      if (index === -1) {
        state.selectedCategoryIDList.push(id)
      } else if (state.selectedCategoryIDList.length > 1) {
        state.selectedCategoryIDList.splice(index, 1)
      }
    },
  },
  actions: {
    refreshRacingList({ commit }): Promise<RacingMetaData> {
      return getRacingList({
        method: 'nextraces',
        count: 50,
      }).then((response) => {
        const data: RacingMetaData = {
          idList: response.next_to_go_ids,
          dataSource: response.race_summaries,
        }

        commit('setAllRacingList', data)
        commit('setUpdateTime', new Date())

        return data
      })
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
