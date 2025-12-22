<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center p-4 font-sans">
    <div class="max-w-[500px] w-full text-center">
       <div class="relative inline-block mb-8">
          <div class="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-6xl animate-bounce duration-[2000ms]">
             🛠️
          </div>
          <div class="absolute -right-2 -top-2 w-10 h-10 bg-white dark:bg-dark-card rounded-full shadow-lg flex items-center justify-center animate-pulse">
             ✨
          </div>
       </div>
       
       <h1 class="text-3xl font-black text-light-text-main dark:text-dark-text-main mb-4">Раздел в разработке</h1>
       <p class="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Мы готовим кое-что особенное! Совсем скоро здесь появятся услуги по установке запчастей, диагностике и сервисному обслуживанию.
       </p>
       
       <n-button @click="router.push('/')" size="large" type="primary" round class="px-10 font-bold shadow-lg shadow-purple-500/20">
          Вернуться на главную
       </n-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
const router = useRouter();
</script>
