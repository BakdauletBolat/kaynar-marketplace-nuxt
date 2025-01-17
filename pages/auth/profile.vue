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
          <div class="bg-white rounded">
            <n-popconfirm
                @positive-click="handlePositiveClick"
                @negative-click="handleNegativeClick"
            >
              <template #trigger>
                <n-button type="error">
                  Выйти из аккаунта
                </n-button>
              </template>
              <template #action>
                <n-button @click="handlePositiveClick" type="error">Выйти</n-button>
                <n-button @click="handleNegativeClick">Отмена</n-button>
              </template>
              <div>
                    <div class="font-bold text-lg">
                Вы уверены, что хотите выйти?
              </div>
                Если вы выйдете, потребуется повторный вход для доступа к вашему аккаунту.
              </div>

            </n-popconfirm>

          </div>
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

function handleNegativeClick() {

}

definePageMeta({
    middleware: "auth",
});
</script>

<style scoped>

</style>
