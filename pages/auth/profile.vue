<template>
  <main class="bg-gray-50 dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    <!-- Functional Header with User Info -->
    <div class="bg-white dark:bg-dark-card sticky top-0 z-30 px-4 py-4 shadow-sm border-b border-gray-100 dark:border-white/5">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl overflow-hidden text-gray-500 dark:text-gray-300">
            <span v-if="!authStore.user?.first_name">
              <PersonIcon class="w-6 h-6" />
            </span>
            <span v-else class="font-bold">{{ authStore.user.first_name[0] }}</span>
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {{ authStore.user?.first_name || 'Пользователь' }} {{ authStore.user?.last_name || '' }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ authStore.user?.phone }}</p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[600px] space-y-6">
      
      <!-- Orders Section -->
      <section v-if="authStore.orders.length > 0">
        <div class="flex items-center justify-between mb-3 px-1">
          <h3 class="text-base font-bold text-gray-900 dark:text-white">Мои заказы</h3>
          <button @click="navigateOrders" class="text-sm text-primary hover:text-primary-dark transition-colors font-medium">
            Смотреть все
          </button>
        </div>
        
        <div class="space-y-3">
          <div v-for="order in authStore.orders.slice(0, 2)" :key="order.id" 
               class="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
               @click="navigateOrders">
            <div class="flex justify-between items-start mb-3">
               <div>
                  <div class="text-sm font-bold text-gray-800 dark:text-white">Заказ №{{ order.id }}</div>
                  <div class="text-xs text-gray-500">{{ timeAgo(order.created_at) }}</div>
               </div>
               <div :class="{
                 'text-green-600 bg-green-50 dark:bg-green-900/20': order.status === 'Завершен',
                 'text-amber-600 bg-amber-50 dark:bg-amber-900/20': order.status === 'В процессе',
                 'text-red-600 bg-red-50 dark:bg-red-900/20': ['Отменен', 'Ошибка'].includes(order.status)
               }" class="text-xs px-2 py-1 rounded-full font-medium">
                 {{ order.status }}
               </div>
            </div>
            
            <div class="flex gap-3">
              <div class="flex -space-x-2 overflow-hidden py-1 pl-1">
                 <div v-for="good in order.goods.slice(0, 3)" :key="good.id" class="w-10 h-10 rounded-full border-2 border-white dark:border-dark-card bg-gray-100 dark:bg-white/10 overflow-hidden flex-shrink-0">
                    <img v-if="good.product.pictures?.[0]?.image" :src="good.product.pictures[0].image" class="w-full h-full object-cover" />
                 </div>
              </div>
              <div class="flex-1 flex items-center justify-end">
                  <span class="font-bold text-gray-900 dark:text-white">{{ getPrice(order.total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Empty Orders Placeholder if needed (Optional) -->
      <section v-else class="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm text-center">
         <div class="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📦</div>
         <p class="text-sm text-gray-500 mb-4">У вас пока нет заказов</p>
         <button @click="router.push({name: 'catalog'})" class="text-primary text-sm font-bold">Перейти в каталог</button>
      </section>


      <!-- Main Action Grid (Monotonous Style) -->
      <div class="grid grid-cols-2 gap-3">
         <button @click="router.push({name: 'auth-favorites'})" class="menu-tile group">
            <div class="flex justify-between items-start w-full">
               <span class="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">Избранное</span>
               <HeartIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div class="w-full text-left mt-2">
               <span class="text-xs text-gray-400">{{ favoritesStore.favorites.length }} товаров</span>
            </div>
         </button>

         <button @click="router.push({name: 'auth-cart'})" class="menu-tile group">
             <div class="flex justify-between items-start w-full">
               <span class="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">Корзина</span>
               <CartIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
             <div class="w-full text-left mt-2">
               <span class="text-xs text-gray-400">Перейти к покупкам</span>
            </div>
         </button>
         
         <button @click="navigateFeedback" class="menu-tile group">
            <div class="flex justify-between items-start w-full">
               <span class="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">Поддержка</span>
               <HelpIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div class="w-full text-left mt-2">
               <span class="text-xs text-gray-400">Вопросы и ответы</span>
            </div>
         </button>
         
         <button @click="navigateSettings" class="menu-tile group">
            <div class="flex justify-between items-start w-full">
               <span class="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">Настройки</span>
               <SettingsIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div class="w-full text-left mt-2">
               <span class="text-xs text-gray-400">Профиль, адрес</span>
            </div>
         </button>
      </div>

      <!-- Logout Button -->
      <button @click="handlePositiveClick" class="w-full bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
         <LogOutIcon class="w-5 h-5" />
         <span class="font-medium">Выйти из аккаунта</span>
      </button>

    </div>
  </main>
</template>

<script setup lang="ts">
import { 
  HeartOutline as HeartIcon, 
  HelpCircleOutline as HelpIcon,
  PersonOutline as PersonIcon,
  CartOutline as CartIcon,
  LogOutOutline as LogOutIcon,
  SettingsOutline as SettingsIcon
} from "@vicons/ionicons5";
import { useAuthStore } from "~/storages/auth-store";
import { useFavoritesStore } from "~/storages/favorites-store";
import { timeAgo } from "~/utils/timeAgo";
import { getPrice } from "~/utils/getPrice";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

onMounted(() => {
    authStore.loadUser();
    authStore.loadOrders(); // Make sure to load orders
    favoritesStore.loadFavorites();
});

function handlePositiveClick() {
  authStore.logout()
  router.push({
    name: 'index'
  })
}

function navigateSettings() {
  router.push({
    name: 'auth-settings',
  })
}

function navigateFeedback() {
  router.push({
    name: "feadback"
  })
}

function navigateOrders() {
  router.push({
    name: "auth-orders"
  })
}

definePageMeta({
    middleware: "auth",
});
</script>

<style scoped>
.menu-tile {
  @apply bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-100 
         dark:border-white/5 flex flex-col items-start justify-between min-h-[100px] shadow-sm active:scale-[0.98] transition-all;
}
</style>
