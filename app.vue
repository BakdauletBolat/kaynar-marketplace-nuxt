<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-notification-provider placement="top">
        <n-message-provider>
            <nuxt-loading-indicator />
            <nuxt-layout>
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        </n-message-provider>
    </n-notification-provider>
    </n-config-provider>
</template>
<script lang="ts" setup>
import { NConfigProvider, NMessageProvider, NNotificationProvider } from "naive-ui";

const themeOverrides = {
    common: {
        primaryColor: "#FFEB3B",
        primaryColorHover: "#FFB300",
        primaryColorPressed: "#FFA000",
    },
    Button: {
        textColorPrimary: "black",
        textColorHoverPrimary: "black",
        textColorPressedPrimary: "black",
    },
    Tabs: {
        tabTextColorHoverLine: "black",
        tabTextColorActiveBar: "black",
        tabTextColorActiveLine: "black",
    },
};
</script>
<style>
.n-base-select-option.n-base-select-option--selected {
  color: black!important;
}
</style>
