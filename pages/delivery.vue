<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-12 font-sans">
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Доставка</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[900px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Доставка</span></n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <div class="space-y-6">
        <div class="bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-10 shadow-sm border border-transparent dark:border-white/5">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <TruckIcon class="w-10 h-10" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-light-text-main dark:text-dark-text-main">Доставка по всем регионам</h2>
              <p class="text-gray-500">Быстро, надежно и до двери</p>
            </div>
          </div>

          <div class="prose dark:prose-invert max-w-none space-y-8">
            <section>
              <h3 class="text-lg font-bold flex items-center gap-2 mb-3">
                <span class="w-1.5 h-6 bg-primary rounded-full"></span>
                Условия доставки
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                Мы предлагаем доставку по всем регионам страны. Сроки доставки зависят от вашего местоположения и составляют от 3 до 7 рабочих дней. Точная стоимость доставки рассчитывается при оформлении заказа.
              </p>
            </section>

            <section class="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
              <h3 class="text-lg font-bold mb-4">Как оформить доставку</h3>
              <div class="grid gap-4">
                <div class="flex gap-4">
                  <div class="font-black text-primary text-xl">01</div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Выберите нужные товары и добавьте их в корзину.</p>
                </div>
                <div class="flex gap-4">
                  <div class="font-black text-primary text-xl">02</div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">На этапе оформления заказа укажите адрес и выберите способ получения.</p>
                </div>
                <div class="flex gap-4">
                  <div class="font-black text-primary text-xl">03</div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Оплатите заказ и ожидайте подтверждения от нашей команды.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-lg font-bold flex items-center gap-2 mb-3">
                <span class="w-1.5 h-6 bg-primary rounded-full"></span>
                Отслеживание заказа
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                После отправки заказа вы получите трек-номер, с помощью которого сможете отслеживать статус доставки на сайте службы доставки.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, TruckIcon } from "@heroicons/vue/24/outline";
const router = useRouter();
</script>