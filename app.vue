<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <nuxt-loading-indicator />
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
  </n-config-provider>
</template>
<script lang="ts" setup>
import {NConfigProvider} from 'naive-ui';
const themeOverrides = {
  common: {
    primaryColor: '#FFEB3B',
    primaryColorHover: '#FFB300',
    primaryColorPressed: '#FFA000',
  },
  Button: {
    textColorPrimary: 'black',
    textColorHoverPrimary: 'black',
    textColorPressedPrimary: 'black'
  }
}
</script>
