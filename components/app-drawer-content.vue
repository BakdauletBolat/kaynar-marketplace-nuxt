<script setup lang="ts">
import {
  PersonOutline,
  HeartOutline,
  HelpCircle
} from "@vicons/ionicons5";
import { NDivider } from "naive-ui";
import { isOpenSidebar, isOpenCart } from "~/storages/storage";

const router = useRouter();

// Закрываем меню при переходе
function handleNavigation() {
  isOpenSidebar.value = false;
  isOpenCart.value = false;
}

const menuItems = [
  { name: 'Доставка', route: 'delivery' },
  { name: 'Возврат', route: 'refund' },
  { name: 'Оплата', route: 'pay' },
  { name: 'Контакты', route: 'contacts' },
];

const userActions = [
  { 
    label: 'Профиль', 
    route: 'auth-profile', 
    icon: PersonOutline 
  },
  { 
    label: 'Избранные', 
    route: 'auth-favorites', 
    icon: HeartOutline 
  },
  { 
    label: 'Покупка в один клик', 
    route: 'feadback', 
    icon: HelpCircle 
  },
];
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Основное меню -->
    <div class="mb-6">
      <ul class="flex flex-col dark:text-dark-text-main gap-4 text-base text-slate-700 font-medium">
        <li v-for="item in menuItems" :key="item.route">
          <nuxt-link
            @click="handleNavigation"
            :to="{ name: item.route }"
            class="block py-2 px-1 hover:text-primary transition-colors"
            active-class="text-primary"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <n-divider class="!my-2" />

    <!-- Пользовательские действия -->
    <div class="flex flex-col gap-4 mt-4">
      <nuxt-link
        v-for="action in userActions"
        :key="action.route"
        @click="handleNavigation"
        :to="{ name: action.route }"
        class="flex items-center gap-4 dark:text-dark-text-main py-2 px-1 text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <component :is="action.icon" class="w-6 h-6 text-slate-500" />
        <span class="font-medium">{{ action.label }}</span>
      </nuxt-link>
    </div>
  </div>
</template>
