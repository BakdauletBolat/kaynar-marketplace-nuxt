<script setup lang="ts">
import { HomeIcon, QuestionMarkCircleIcon, HeartIcon, UserIcon,
        ShoppingCartIcon } from '@heroicons/vue/20/solid'
import {HomeIcon as HomeIconOutline,
        QuestionMarkCircleIcon as QuestionMarkCircleIconOutline,
        HeartIcon as HeartIconOutline,
        UserIcon as UserIconOutline,
        ShoppingCartIcon as ShoppingCartIconOutline,
        } from '@heroicons/vue/24/outline';
import BottomAppBarItem from "~/components/bottom-app-bar-item.vue";

const route = useRoute()
const router = useRouter()
const cardStorage = CardStorage.getInstance();

function isActive(routeName: string) {
  const homeRoutes = ['index', 'catalog', 'catalog-manufacturerId'];
  const profileRoutes = ['auth-profile', 'auth-selection', 'auth-login', 'auth-register'];
  const favoriteRoutes = ['auth-favorites'];
  const cartRoutes = ['auth-cart'];

  if (routeName == 'index') {
    return homeRoutes.includes(route.name);
  }
  if (routeName == 'auth-profile') {
    return profileRoutes.includes(route.name);
  }
  if (routeName == 'auth-cart') {
    return cartRoutes.includes(route.name);
  }
  if (routeName == 'auth-favorites') {
    return favoriteRoutes.includes(route.name);
  }
  return false;
}


</script>

<template>
  <mobile-only-component>
    <nav class="fixed z-50 bottom-0 left-0 w-full bg-white  border-t shadow-lg">
      <div class="flex justify-between items-center max-w-md mx-auto px-4 py-2">
        <!-- Кнопка Главная -->
        <bottom-app-bar-item :is-active="isActive('index')"
                             :active-icon="HomeIcon"
                             :base-icon="HomeIconOutline"
                             title="Главная"
                             route-name="index"></bottom-app-bar-item>
        <n-badge :value="cardStorage.goods.value.length" :max="5">
          <bottom-app-bar-item :is-active="isActive('auth-cart')"
                               :active-icon="ShoppingCartIcon"
                               :base-icon="ShoppingCartIconOutline"
                               title="Корзина"
                               route-name="auth-cart"></bottom-app-bar-item>
        </n-badge>

        <bottom-app-bar-item :is-active="isActive('auth-favorites')"
                             :active-icon="HeartIcon"
                             :base-icon="HeartIconOutline"
                             title="Избранные"
                             route-name="auth-favorites"></bottom-app-bar-item>
        <bottom-app-bar-item :is-active="isActive('auth-profile')"
                             :active-icon="UserIcon"
                             :base-icon="UserIconOutline"
                             title="Профиль"
                             route-name="auth-profile"></bottom-app-bar-item>
      </div>
    </nav>
  </mobile-only-component>
</template>
<style>
nav {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
