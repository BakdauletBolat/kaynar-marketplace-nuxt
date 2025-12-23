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
        <!-- Theme Selection Dialog for first-time users -->
        <client-only>
          <ThemeSelectionDialog />
        </client-only>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { NConfigProvider, NMessageProvider, NNotificationProvider, darkTheme } from "naive-ui";
import ThemeSelectionDialog from '~/components/ThemeSelectionDialog.vue';
import { useTheme } from '~/composables/useTheme';

// Use shared theme composable
const { isDark, initTheme } = useTheme();

// Computed property for Naive UI theme
const theme = computed(() => (isDark.value ? darkTheme : null));

// Initialize theme on mount
onMounted(() => {
  initTheme();
});

// Kaynar Design System Overrides
const themeOverrides = computed(() => {
  const isDarkMode = isDark.value;
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
      textColor: isDarkMode ? '#ffffff' : '#000000',
      borderColor: isDarkMode ? '#333' : '#d1d5db',
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