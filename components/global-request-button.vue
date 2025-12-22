<template>
  <div class="fixed bottom-24 right-4 z-40 lg:bottom-8 lg:right-8">
    <button
      @click="router.push({ name: 'feadback' })"
      class="group flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-primary to-purple-600 rounded-full shadow-lg shadow-purple-500/40 text-white hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden"
      aria-label="Помощь в подборе"
    >
      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
      <component :is="ChatBubbleLeftRightIcon" class="w-7 h-7 relative z-10" />
      
      <!-- Tooltip / Label (Optional, appears on hover for desktop) -->
      <span class="absolute right-full mr-3 bg-white dark:bg-dark-card text-gray-700 dark:text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden lg:block">
        Помощь в подборе
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";
const router = useRouter();
</script>