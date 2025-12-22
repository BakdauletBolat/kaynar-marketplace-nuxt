<script setup lang="ts">
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  HeartIcon, 
  UserIcon,
  ShoppingCartIcon 
} from '@heroicons/vue/20/solid'
import {
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  HeartIcon as HeartIconOutline,
  UserIcon as UserIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
} from '@heroicons/vue/24/outline';
import BottomAppBarItem from "~/components/bottom-app-bar-item.vue";
import { CardStorage } from "~/storages/storage";

const route = useRoute()
const cardStorage = CardStorage.getInstance();

function isActive(routeName: string) {
  const homeRoutes = ['index'];
  const catalogRoutes = ['catalog', 'catalog-manufacturerId', 'catalog-buy-online', 'search-brand', 'search-model'];
  const profileRoutes = ['auth-profile', 'auth-selection', 'auth-login', 'auth-register', 'auth-orders', 'auth-settings'];
  const favoriteRoutes = ['auth-favorites'];
  const cartRoutes = ['auth-cart'];

  const current = String(route.name ?? '');

  if (routeName === 'index') return homeRoutes.includes(current);
  if (routeName === 'catalog') return catalogRoutes.includes(current) || current.startsWith('catalog');
  if (routeName === 'auth-profile') return profileRoutes.includes(current);
  if (routeName === 'auth-cart') return cartRoutes.includes(current);
  if (routeName === 'auth-favorites') return favoriteRoutes.includes(current);
  
  return current === routeName;
}
</script>

<template>
  <nav class="lg:hidden fixed z-50 bottom-0 left-0 w-full bg-white dark:bg-[#202022] border-t border-gray-100 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-colors">
    <div class="grid grid-cols-5 items-center justify-items-center h-[56px] max-w-lg mx-auto px-1">
      
      <bottom-app-bar-item :is-active="isActive('index')"
                           :active-icon="HomeIcon"
                           :base-icon="HomeIconOutline"
                           title="Главная"
                           route-name="index"></bottom-app-bar-item>

      <bottom-app-bar-item :is-active="isActive('catalog')"
                           :active-icon="MagnifyingGlassIcon"
                           :base-icon="MagnifyingGlassIconOutline"
                           title="Каталог"
                           route-name="catalog"></bottom-app-bar-item>
      
      <div class="relative w-full flex justify-center">
        <n-badge v-if="cardStorage.goods.value.length" :value="cardStorage.goods.value.length" :max="99" class="absolute -top-1 right-2 z-10 pointer-events-none scale-75" color="#f14d60" />
        <bottom-app-bar-item :is-active="isActive('auth-cart')"
                             :active-icon="ShoppingCartIcon"
                             :base-icon="ShoppingCartIconOutline"
                             title="Корзина"
                             route-name="auth-cart"></bottom-app-bar-item>
      </div>

      <bottom-app-bar-item :is-active="isActive('auth-favorites')"
                           :active-icon="HeartIcon"
                           :base-icon="HeartIconOutline"
                           title="Избранное"
                           route-name="auth-favorites"></bottom-app-bar-item>
      
      <bottom-app-bar-item :is-active="isActive('auth-profile')"
                           :active-icon="UserIcon"
                           :base-icon="UserIconOutline"
                           title="Профиль"
                           route-name="auth-profile"></bottom-app-bar-item>
    </div>
  </nav>
</template>
