<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <nuxt-loading-indicator />
            <nuxt-layout>
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        </n-message-provider>
    </n-config-provider>
</template>
<script lang="ts" setup>
import { NConfigProvider, NMessageProvider } from "naive-ui";

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
