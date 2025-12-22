<template>
  <client-only>
    <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-24 lg:pb-12 font-sans">
      
      <!-- Header -->
      <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
         <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
            <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
         </button>
         <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Оформление заказа</h1>
      </div>

      <div class="container mx-auto px-4 py-6 max-w-[1200px]">
        <!-- Desktop Breadcrumbs -->
        <desktop-only-component>
          <div class="mb-6">
            <n-breadcrumb>
              <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
              <n-breadcrumb-item><nuxt-link :to="{ name: 'auth-cart' }" class="text-gray-400 hover:text-primary transition-colors">Корзина</nuxt-link></n-breadcrumb-item>
              <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Оформление</span></n-breadcrumb-item>
            </n-breadcrumb>
          </div>
        </desktop-only-component>

        <!-- Main Layout -->
        <div class="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          
          <!-- Left Column: Forms -->
          <div class="space-y-6">
            
            <!-- Success Message (After order) -->
            <div v-if="orderStore.order" class="bg-white dark:bg-dark-card rounded-3xl p-8 text-center shadow-lg border border-transparent dark:border-white/5 animate-in fade-in zoom-in duration-300">
               <div class="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckBadgeIcon class="w-12 h-12" />
               </div>
               <h2 class="text-2xl font-black mb-2 text-light-text-main dark:text-dark-text-main">Спасибо за заказ!</h2>
               <p class="text-gray-500 mb-6">Ваш номер заказа <span class="text-primary font-bold">#{{ orderStore.order.id }}</span>. Мы свяжемся с вами в ближайшее время для подтверждения.</p>
               <n-button type="primary" size="large" round @click="router.push({name: 'index'})">Вернуться на главную</n-button>
            </div>

            <template v-else>
               <!-- Step 1: Delivery Address -->
               <div class="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-transparent dark:border-white/5">
                  <div class="flex items-center gap-3 mb-6">
                     <div class="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">1</div>
                     <h3 class="text-lg font-bold text-light-text-main dark:text-dark-text-main">Способ получения</h3>
                  </div>
                  <address-with-user-info-component></address-with-user-info-component>
               </div>

               <!-- Popular products as recommendation -->
               <div class="hidden lg:block mt-12">
                  <h3 class="text-xl font-bold mb-6">Вам может понадобиться</h3>
                  <div class="grid grid-cols-3 gap-4">
                     <ProductCard :item="item" v-for="item in productStore.popularProducts.slice(0, 3)" :key="item.id" />
                  </div>
               </div>
            </template>
          </div>

          <!-- Right Column: Summary (Sticky) -->
          <aside class="lg:sticky lg:top-24 space-y-4">
             <div class="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-lg border border-transparent dark:border-white/5">
                <h3 class="text-lg font-bold mb-6 text-light-text-main dark:text-dark-text-main">Детали заказа</h3>
                
                <!-- Order Summary List -->
                <div class="space-y-4 mb-6">
                   <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Товары ({{ cardStorage.goods.value.length }})</span>
                      <span class="font-medium">{{ getPrice(cardStorage.totalCost) }}</span>
                   </div>
                   <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Доставка</span>
                      <span class="text-emerald-500 font-bold">Бесплатно</span>
                   </div>
                   <div class="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-end">
                      <span class="text-lg font-bold text-light-text-main dark:text-dark-text-main">Итого</span>
                      <span class="text-2xl font-black text-primary leading-none">{{ getPrice(cardStorage.totalCost) }}</span>
                   </div>
                </div>

                <!-- Small previews of items in cart -->
                <div class="flex flex-wrap gap-2 mb-6">
                   <div v-for="item in cardStorage.goods.value.slice(0, 4)" :key="item.id" class="w-12 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-white/5 border dark:border-white/10">
                      <img :src="item.picture_url" class="w-full h-full object-cover" />
                   </div>
                   <div v-if="cardStorage.goods.value.length > 4" class="w-12 h-16 rounded-md bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">
                      +{{ cardStorage.goods.value.length - 4 }}
                   </div>
                </div>

                <p class="text-[10px] text-gray-400 mb-6 leading-relaxed">
                   Нажимая на кнопку "Заказать", вы соглашаетесь с условиями <a href="#" class="text-primary hover:underline">Правил пользования торговой площадкой</a> и <a href="#" class="text-primary hover:underline">правилами возврата</a>.
                </p>
             </div>
             
             <!-- Safe Info -->
             <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-2xl flex gap-3">
                <CheckBadgeIcon class="w-6 h-6 text-blue-500 shrink-0" />
                <p class="text-xs text-blue-700 dark:text-blue-300 leading-snug">Безопасная оплата. Ваши данные защищены по стандарту PCI DSS.</p>
             </div>
          </aside>
        </div>
      </div>
    </main>
  </client-only>
</template>
<script lang="ts" setup>
import { NButton, NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/vue/24/outline";
import ProductCard from "~/components/ProductCard.vue";
import AddressWithUserInfoComponent from "./address-with-user-info-component.vue";
import { useOrderStore } from "~/storages/order-store";
import { CardStorage } from '@/storages/storage';
import { getPrice } from '~/utils/getPrice';

const router = useRouter();
const cardStorage = CardStorage.getInstance();
const orderStore = useOrderStore();
const productStore = useProductStore();

onMounted(() => {
  productStore.loadPopularProducts({});
});

definePageMeta({
  middleware: "auth",
});
</script>
