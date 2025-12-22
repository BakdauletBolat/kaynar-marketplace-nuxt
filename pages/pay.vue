<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-12 font-sans">
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Оплата</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[900px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Оплата</span></n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <div class="bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-10 shadow-sm border border-transparent dark:border-white/5">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <CreditCardIcon class="w-10 h-10" />
          </div>
          <div>
            <h2 class="text-2xl font-black text-light-text-main dark:text-dark-text-main">Способы оплаты</h2>
            <p class="text-gray-500">Удобные и безопасные расчеты</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mb-10">
           <div class="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div class="text-3xl">💳</div>
              <div>
                 <div class="font-bold">Kaspi Gold / Red</div>
                 <div class="text-xs text-gray-500">Мгновенная оплата</div>
              </div>
           </div>
           <div class="p-6 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div class="text-3xl">📅</div>
              <div>
                 <div class="font-bold">Рассрочка</div>
                 <div class="text-xs text-gray-500">Halyk и Kaspi до 24 мес.</div>
              </div>
           </div>
        </div>

        <div class="prose dark:prose-invert max-w-none">
           <h3 class="text-lg font-bold mb-4 italic">Как оплатить заказ?</h3>
           <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                 <span class="w-8 h-8 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center font-bold text-primary">1</span>
                 <p class="text-sm text-gray-600 dark:text-gray-400">Добавьте нужные товары в корзину и перейдите к оформлению.</p>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                 <span class="w-8 h-8 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center font-bold text-primary">2</span>
                 <p class="text-sm text-gray-600 dark:text-gray-400">Выберите подходящий способ оплаты в соответствующем разделе.</p>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                 <span class="w-8 h-8 rounded-full bg-white dark:bg-dark-card shadow-sm flex items-center justify-center font-bold text-primary">3</span>
                 <p class="text-sm text-gray-600 dark:text-gray-400">Следуйте инструкциям платежной системы для завершения транзакции.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, CreditCardIcon } from "@heroicons/vue/24/outline";
const router = useRouter();
</script>