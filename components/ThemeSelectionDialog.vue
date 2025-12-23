<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="theme-dialog-overlay" @click.self="close">
        <Transition name="slide-up">
          <div v-if="isVisible" class="theme-dialog">
            <div class="theme-dialog__handle" />

            <div class="theme-dialog__header">
              <h2 class="theme-dialog__title">Выберите тему</h2>
              <p class="theme-dialog__subtitle">Как вам удобнее пользоваться приложением?</p>
            </div>

            <div class="theme-dialog__options">
              <button
                v-for="option in themeOptions"
                :key="option.value"
                class="theme-option"
                :class="{ 'theme-option--selected': selectedTheme === option.value }"
                @click="selectTheme(option.value)"
              >
                <div class="theme-option__preview" :class="option.previewClass">
                  <component :is="option.icon" class="theme-option__icon" />
                </div>
                <span class="theme-option__label">{{ option.label }}</span>
                <span class="theme-option__description">{{ option.description }}</span>
              </button>
            </div>

            <button class="theme-dialog__confirm" @click="confirm">
              Продолжить
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SunnyOutline, MoonOutline, PhonePortraitOutline } from '@vicons/ionicons5';
import { useTheme } from '~/composables/useTheme';

const STORAGE_KEY = 'kaynar-theme-selected';

const { setTheme } = useTheme();
const isVisible = ref(false);
const selectedTheme = ref<'light' | 'dark' | 'system'>('system');

const themeOptions = [
  {
    value: 'light' as const,
    label: 'Светлая',
    description: 'Классический светлый интерфейс',
    icon: SunnyOutline,
    previewClass: 'theme-option__preview--light'
  },
  {
    value: 'dark' as const,
    label: 'Тёмная',
    description: 'Комфортно для глаз вечером',
    icon: MoonOutline,
    previewClass: 'theme-option__preview--dark'
  },
  {
    value: 'system' as const,
    label: 'Как в системе',
    description: 'Автоматически подстраивается',
    icon: PhonePortraitOutline,
    previewClass: 'theme-option__preview--system'
  }
];

function selectTheme(theme: 'light' | 'dark' | 'system') {
  selectedTheme.value = theme;
  setTheme(theme);
}

function confirm() {
  localStorage.setItem(STORAGE_KEY, 'true');
  isVisible.value = false;
}

function close() {
  confirm();
}

onMounted(() => {
  // Check if user has already selected theme
  const hasSelected = localStorage.getItem(STORAGE_KEY);
  if (!hasSelected) {
    // Small delay for better UX
    setTimeout(() => {
      isVisible.value = true;
    }, 500);
  }
});
</script>

<style scoped>
.theme-dialog-overlay {
  @apply fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm;
  @apply flex items-end justify-center;
}

.theme-dialog {
  @apply w-full max-w-lg bg-white dark:bg-dark-card;
  @apply rounded-t-3xl p-6 pb-8;
  @apply flex flex-col;
  padding-bottom: calc(2rem + env(safe-area-inset-bottom));
}

.theme-dialog__handle {
  @apply w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6;
}

.theme-dialog__header {
  @apply text-center mb-6;
}

.theme-dialog__title {
  @apply text-xl font-bold text-gray-900 dark:text-white mb-1;
}

.theme-dialog__subtitle {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.theme-dialog__options {
  @apply grid grid-cols-3 gap-3 mb-6;
}

.theme-option {
  @apply flex flex-col items-center gap-2 p-3 rounded-2xl;
  @apply border-2 border-transparent;
  @apply transition-all duration-200 active:scale-95;
  @apply bg-gray-50 dark:bg-white/5;
}

.theme-option--selected {
  @apply border-primary bg-primary/5 dark:bg-primary/10;
}

.theme-option__preview {
  @apply w-14 h-14 rounded-xl flex items-center justify-center mb-1;
  @apply transition-colors duration-200;
}

.theme-option__preview--light {
  @apply bg-amber-100 text-amber-600;
}

.theme-option__preview--dark {
  @apply bg-indigo-900 text-indigo-300;
}

.theme-option__preview--system {
  @apply bg-gradient-to-br from-amber-100 to-indigo-900;
  @apply text-white;
}

.theme-option__icon {
  @apply w-7 h-7;
}

.theme-option__label {
  @apply text-sm font-semibold text-gray-900 dark:text-white;
}

.theme-option__description {
  @apply text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight;
}

.theme-dialog__confirm {
  @apply w-full py-4 rounded-xl;
  @apply bg-primary text-white font-bold text-base;
  @apply transition-all duration-200 active:scale-[0.98];
  @apply hover:bg-primary-hover;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
