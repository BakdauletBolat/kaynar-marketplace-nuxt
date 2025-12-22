<script setup lang="ts">
import { NPageHeader, NModal, NTag, NButton, NImage, NEllipsis, NResult, NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { timeAgo } from "~/utils/timeAgo";
import { getPrice } from "~/utils/getPrice";

const userStore = useAuthStore();
const router = useRouter();
const message = useMessage();

const activeCancelOrder = ref<number | null>(null);
const showCancelOrderModal = computed<boolean>(()=>{
  return activeCancelOrder.value !== null;
})

onMounted(()=>{
  userStore.loadOrders();
});

function handleBack() {
  router.back();
}

function cancelOrder() {
  if (activeCancelOrder.value) {
    userStore.cancelOrder(activeCancelOrder.value).then(()=>{
      message.success('Заказ успешно отменен')
      userStore.loadOrders();
      activeCancelOrder.value = null;
    }).catch(err=>{
      message.error(err.message)
    })
  }
}

definePageMeta({
  middleware: "auth",
});
</script>

<template>
<main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-24 lg:pb-12 font-sans">
  <n-modal v-model:show="showCancelOrderModal"
            title="Отмена заказа"
            preset="dialog"
            positive-text="Да, отменить"
            negative-text="Назад"
            @positive-click="cancelOrder"
            @negative-click="()=>activeCancelOrder = null">
     <p>Вы действительно хотите отменить этот заказ?</p>
  </n-modal>

  <!-- Header -->
  <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
     <button @click="handleBack" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
       <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
     </button>
     <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Мои заказы</h1>
  </div>

  <div class="container mx-auto px-4 py-6 max-w-[900px]">
    <!-- Desktop Breadcrumbs -->
    <desktop-only-component>
      <div class="mb-6">
        <n-breadcrumb>
          <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
          <n-breadcrumb-item><nuxt-link :to="{ name: 'auth-profile' }" class="text-gray-400 hover:text-primary transition-colors">Профиль</nuxt-link></n-breadcrumb-item>
          <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Заказы</span></n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>

    <div v-if="userStore.orders.length > 0" class="space-y-4">
      <div v-for="order in userStore.orders" :key="order.id" 
           class="bg-white dark:bg-dark-card rounded-2xl p-4 lg:p-6 shadow-sm border border-transparent dark:border-white/5 hover:shadow-md transition-shadow">
        
        <div class="flex flex-col md:flex-row justify-between gap-4 mb-4 pb-4 border-b border-gray-50 dark:border-white/5">
           <div class="flex items-center gap-4">
              <div class="text-sm font-bold text-primary">№ {{ order.id }}</div>
              <div class="text-xs text-gray-400">{{ timeAgo(order.created_at) }}</div>
           </div>
           <div>
              <n-tag :type="order.status === 'Завершен' ? 'success' : (order.status === 'В процессе' ? 'warning' : 'error')" round size="small">
                {{ order.status }}
              </n-tag>
           </div>
        </div>

        <div class="flex gap-4">
          <!-- Previews of products in order -->
          <div class="flex-shrink-0 flex -space-x-4 overflow-hidden">
             <div v-for="(good, idx) in order.goods.slice(0, 3)" :key="good.id" 
                  class="w-16 h-20 rounded-lg border-2 border-white dark:border-dark-card bg-gray-100 overflow-hidden shadow-sm">
                <img :src="good.product.pictures?.[0]?.image || ''" class="w-full h-full object-cover" />
             </div>
             <div v-if="order.goods.length > 3" class="w-16 h-20 rounded-lg border-2 border-white dark:border-dark-card bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                +{{ order.goods.length - 3 }}
             </div>
          </div>

          <div class="flex-grow min-w-0 flex flex-col justify-between">
            <div>
              <n-ellipsis class="text-sm font-medium text-light-text-main dark:text-dark-text-main" style="max-width: 100%">
                {{ order.goods.map(good => good.product.name).join(', ') }}
              </n-ellipsis>
            </div>
            
            <div class="flex items-end justify-between mt-2">
               <div class="text-lg font-black text-light-text-main dark:text-dark-text-main">
                 {{ getPrice(order.total) }}
               </div>
               <div v-if="order.status === 'В процессе'">
                 <n-button size="small" secondary type="error" round @click="activeCancelOrder=order.id">Отменить</n-button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center mt-20 text-center">
       <div class="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-4xl">
         📦
       </div>
       <h2 class="text-xl font-bold text-light-text-main dark:text-dark-text-main mb-2">Заказов пока нет</h2>
       <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
         Ваши покупки будут отображаться здесь
       </p>
       <n-button @click="router.push({name: 'catalog'})" type="primary" size="large" round class="px-8 font-semibold">
         За покупками
       </n-button>
    </div>
  </div>
</main>
</template>