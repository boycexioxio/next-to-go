<script lang="ts" setup></script>

<template>
  <div class="py-10 bg-orange-600">
    <div class="xl:w-1/2 mx-auto px-10">
      <div class="flex justify-between">
        <div>
          <img src="\src\assets\logo.png" alt="logo" />
        </div>
        <div class="flex items-center">
          <div class="mr-5 text-white text-size">{{ $t('chooseLang') }}</div>
          <button
            v-show="$i18n.locale !== 'zh'"
            type="button"
            class="py-1 px-3 bg-indigo-500 text-white font-semibold rounded-md shadow focus:outline-none text-size"
            @click="$i18n.locale = 'zh'"
          >
            切换至简体中文
          </button>
          <button
            v-show="$i18n.locale !== 'en'"
            type="button"
            class="py-1 px-3 bg-indigo-500 text-white font-semibold rounded-md shadow focus:outline-none text-size"
            @click="$i18n.locale = 'en'"
          >
            Change to English
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: unset;
  height: unset;
  width: 48px;
}

.text-size {
  font-size: 14px;
}
</style>
