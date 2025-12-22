<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-12 font-sans">
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Возврат товара</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[900px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Возврат</span></n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <div class="bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-10 shadow-sm border border-transparent dark:border-white/5">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 bg-wb-red/10 text-wb-red rounded-2xl flex items-center justify-center">
            <ArrowPathIcon class="w-10 h-10" />
          </div>
          <div>
            <h2 class="text-2xl font-black text-light-text-main dark:text-dark-text-main">Гарантия и возврат</h2>
            <p class="text-gray-500">Прозрачные условия обмена и возврата</p>
          </div>
        </div>

        <div class="space-y-8">
          <section>
             <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-wb-red rounded-full"></span>
                Сроки возврата
             </h3>
             <p class="text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
               Мы принимаем возвраты ДВС (двигателей) в течение <span class="text-wb-red font-bold">14 дней</span> с момента покупки. 
               Для остального ассортимента срок возврата составляет <span class="text-wb-red font-bold">5 дней</span>.
             </p>
          </section>

          <section>
             <h3 class="text-lg font-bold mb-3">Как оформить возврат?</h3>
             <ul class="space-y-3">
                <li class="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                   <div class="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-0.5">✓</div>
                   Свяжитесь с нами по телефону +7 (777) 523 88 88 или почте kaynaravto@mail.ru
                </li>
                <li class="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                   <div class="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-0.5">✓</div>
                   Предоставьте данные заказа и причину возврата (фото/видео неисправности)
                </li>
                <li class="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                   <div class="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-0.5">✓</div>
                   Следуйте инструкциям менеджера для отправки товара обратно на склад
                </li>
             </ul>
          </section>

          <div class="p-6 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
             <h4 class="font-bold text-amber-800 dark:text-amber-400 mb-2">Важно</h4>
             <p class="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                Товар должен находиться в исходном состоянии, без следов самостоятельного вскрытия или установки, если не было выявлено скрытых дефектов. Некоторые товары (персонализированные или по спецзаказу) возврату не подлежат.
             </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
const router = useRouter();
</script>