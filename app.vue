<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-notification-provider placement="top">
      <n-message-provider>
        <nuxt-loading-indicator color="#F29F05" />
        <div class="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main transition-colors duration-300">
          <nuxt-layout>
            <nuxt-page></nuxt-page>
          </nuxt-layout>
        </div>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
import { NConfigProvider, NMessageProvider, NNotificationProvider, darkTheme } from "naive-ui";
import { useStorage } from '@vueuse/core';

// State for theme (persisted in localStorage)
const themeState = useStorage('kaynar-theme', 'light');

// Computed property for Naive UI theme
const theme = computed(() => (themeState.value === 'dark' ? darkTheme : null));

// Toggle logic (can be exposed via provide or store later if needed)
// For now, we assume a component will modify themeState.value
// You can use: themeState.value = themeState.value === 'dark' ? 'light' : 'dark'

// Handle HTML class and Body background
const updateGlobalTheme = () => {
  if (process.client) {
    const html = document.documentElement;
    if (themeState.value === 'dark') {
      html.classList.add('dark');
      document.body.style.backgroundColor = '#151517'; 
    } else {
      html.classList.remove('dark');
      document.body.style.backgroundColor = '#f6f6f9';
    }
  }
};

watch(themeState, updateGlobalTheme, { immediate: true });
onMounted(updateGlobalTheme);

// Kaynar Design System Overrides
const themeOverrides = computed(() => {
  const isDark = themeState.value === 'dark';
  const primaryColor = '#F29F05';
  const primaryHover = '#D98E04';
  const primaryPressed = '#BF7E04';
  
  return {
    common: {
      primaryColor: primaryColor,
      primaryColorHover: primaryHover,
      primaryColorPressed: primaryPressed,
      borderRadius: '8px', 
    },
    Button: {
      textColorPrimary: '#ffffff',
      textColorHoverPrimary: '#ffffff', 
      textColorPressedPrimary: '#ffffff',
      // Outline buttons
      textColor: isDark ? '#ffffff' : '#000000',
      borderColor: isDark ? '#333' : '#d1d5db',
    },
    Input: {
      fontSizeSmall: '16px',
      fontSizeMedium: '16px',
      fontSizeLarge: '16px',
      borderRadius: '8px',
      borderHover: `1px solid ${primaryColor}`,
      borderFocus: `1px solid ${primaryColor}`,
      boxShadowFocus: `0 0 0 2px ${primaryColor}33`, // Soft yellow glow
    },
    Select: {
      fontSizeSmall: '16px',
      fontSizeMedium: '16px',
      fontSizeLarge: '16px',
    },
    TreeSelect: {
      fontSizeSmall: '16px',
      fontSizeMedium: '16px',
      fontSizeLarge: '16px',
    },
    Checkbox: {
      checkMarkColor: '#ffffff',
      colorChecked: primaryColor,
      borderChecked: `1px solid ${primaryColor}`,
    },
    Tabs: {
      tabTextColorActiveLine: primaryColor,
      tabTextColorHoverLine: primaryHover,
      barColor: primaryColor,
    },
    Slider: {
      fillColor: primaryColor,
      fillColorHover: primaryHover,
    }
  };
});
</script>

<style>
/* Global resets if needed */
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar for Chrome/Safari/Edge */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #3f3f46;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Naive UI Select Text Fix */
.n-base-select-option.n-base-select-option--selected {
  color: #F29F05 !important; /* Make selected item yellow */
}
</style>