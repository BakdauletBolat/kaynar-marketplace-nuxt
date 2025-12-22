<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-12 font-sans">
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Контакты</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[1000px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Контакты</span></n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Contact Info -->
        <div class="bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-8 shadow-sm border border-transparent dark:border-white/5">
          <h2 class="text-2xl font-black mb-8 text-light-text-main dark:text-dark-text-main italic">Наши офисы</h2>
          
          <div class="space-y-8">
            <div class="flex gap-4">
              <div class="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <MapPinIcon class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-2">Адреса</h3>
                <div class="space-y-4">
                   <div class="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <div class="font-bold text-sm">г. Шымкент</div>
                      <div class="text-sm text-gray-500">ул. Сайрамская, 17А</div>
                   </div>
                   <div class="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <div class="font-bold text-sm">г. Астана</div>
                      <div class="text-sm text-gray-500">ул. Кенжина, 8</div>
                   </div>
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="shrink-0 w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                <PhoneIcon class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Телефон</h3>
                <a href="tel:+77775238888" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">+7 (777) 523 88 88</a>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="shrink-0 w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                <EnvelopeIcon class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Почта</h3>
                <a href="mailto:kaynaravto@mail.ru" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">kaynaravto@mail.ru</a>
              </div>
            </div>
          </div>

          <div class="mt-10 pt-8 border-t border-gray-100 dark:border-white/5">
             <h3 class="font-bold mb-4">Мы в социальных сетях</h3>
             <a href="https://www.instagram.com/kaynaravto/" target="_blank" class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
                <span>Instagram</span>
             </a>
          </div>
        </div>

        <!-- Map Placeholder / Image -->
        <div class="bg-gray-200 dark:bg-dark-card rounded-3xl overflow-hidden min-h-[400px] relative border border-transparent dark:border-white/5 shadow-inner flex items-center justify-center">
           <div class="text-center p-8">
              <div class="text-4xl mb-4">📍</div>
              <h3 class="text-xl font-bold mb-2">Здесь могла быть ваша карта</h3>
              <p class="text-sm text-gray-500">Интегрируйте Яндекс или Google карты для наглядности</p>
           </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/vue/24/outline";
const router = useRouter();
</script>