import { useStorage } from '@vueuse/core';
import { computed, watch } from 'vue';

type ThemeMode = 'light' | 'dark' | 'system';

// Shared state across all instances
const themeMode = useStorage<ThemeMode>('kaynar-theme', 'system');

// Apply theme to DOM
function applyTheme(isDark: boolean) {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
    document.body.style.backgroundColor = '#151517';
  } else {
    html.classList.remove('dark');
    document.body.style.backgroundColor = '#f6f6f9';
  }
}

// Resolve if dark mode should be active
function resolveIsDark(mode: ThemeMode): boolean {
  if (typeof window === 'undefined') return false;

  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return mode === 'dark';
}

export function useTheme() {
  const isDark = computed(() => resolveIsDark(themeMode.value));

  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode;
    applyTheme(resolveIsDark(mode));
  };

  const toggleTheme = () => {
    if (themeMode.value === 'light') {
      setTheme('dark');
    } else if (themeMode.value === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Initialize theme on first use
  const initTheme = () => {
    if (typeof window === 'undefined') return;

    applyTheme(isDark.value);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (themeMode.value === 'system') {
        applyTheme(resolveIsDark('system'));
      }
    });
  };

  // Watch for external changes (e.g., from other tabs)
  watch(themeMode, (newMode) => {
    applyTheme(resolveIsDark(newMode));
  });

  return {
    themeMode,
    isDark,
    setTheme,
    toggleTheme,
    initTheme
  };
}
