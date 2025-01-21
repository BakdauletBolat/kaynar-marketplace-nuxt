<template>
    <main>
      <mobile-only-component>
        <n-page-header class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
          <template #title>
      <span style="text-decoration: none; color: inherit">
        Кабинет
      </span>
          </template>
        </n-page-header>
      </mobile-only-component>
      <desktop-only-component>
        <div class="mt-4 container px-4 mx-auto">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{
            name: 'index'
          }">Главная
            </nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item>
              Кабинет
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>
      <section>
        <div class="min-h-screen max-w-[500px] mx-auto mt-[60px] lg:mt-4 p-4">
          <!-- 1. Верхняя часть: Аватар и информация -->
          <div class="bg-white rounded mb-6">
            <div class="flex items-center">
              <!-- Аватар -->
              <div class="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0"></div>
              <!-- Информация о пользователе -->
              <div class="ml-4">
                <h1 class="text-xl font-bold">{{authStore.user?.first_name}} {{authStore.user?.last_name}}</h1>
                <p class="text-gray-500">{{authStore.user?.email ?? '-'}}</p>
                <p class="text-gray-500">{{authStore.user?.phone}}</p>
              </div>
            </div>
          </div>
          <div>
          </div>
          <n-list>
            <n-list-item class="cursor-pointer" @click="navigateOrders">Мой заказы</n-list-item>
            <n-list-item class="cursor-pointer" @click="navigateSettings">Настройки профиля</n-list-item>
            <n-list-item class="cursor-pointer" @click="navigateFeedback">Помощь</n-list-item>
            <n-list-item class="cursor-pointer" @click="handlePositiveClick">Выйти с аккаунта</n-list-item>
          </n-list>
        </div>
      </section>
    </main>
</template>

<script setup lang="ts">
import {NPageHeader} from "naive-ui";
import { useAuthStore } from "~/storages/auth-store";
import { useFavoritesStore } from "~/storages/favorites-store";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

onMounted(() => {
    authStore.loadUser();
    favoritesStore.loadFavorites();
});


function handlePositiveClick() {
  authStore.logout()
  router.push({
    name: 'auth-selection'
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

</style>
