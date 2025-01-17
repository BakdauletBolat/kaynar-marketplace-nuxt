<template>
  <main class="container mx-auto">
    <mobile-only-component>
      <n-page-header class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Избранные товары
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4">
        <n-breadcrumb>
          <n-breadcrumb-item><nuxt-link :to="{
            name: 'index'
          }">Главная
          </nuxt-link></n-breadcrumb-item>
          <n-breadcrumb-item>
            Избранные
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <section class="pt-[60px] lg:pt-4 px-4">
      <favorites-list v-if="favoritesStore.favorites.length > 0" :items="favoritesStore.favorites"></favorites-list>
      <section v-else class="w-full flex  max-w-[400px] mx-auto flex-col mt-8">
        <!-- Сообщение -->
        <h1 class="text-lg text-center font-semibold">Нет избранных товаров</h1>
        <p class="text-center mb-6">
          Вы ещё не добавили товары в избранное. Нажмите на значок ♥ возле понравившихся товаров, чтобы добавить их
          сюда.
        </p>
        <!-- Кнопка действия -->
        <n-button @click="routeToCatalog" type="primary">Перейти к покупкам</n-button>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import FavoritesList from "@/components/favorites-list.vue";
import {useFavoritesStore} from "~/storages/favorites-store";
import {NPageHeader} from "naive-ui";

const favoritesStore = useFavoritesStore();
const router = useRouter()

function routeToCatalog() {
  router.push({
    name: "catalog",
  })
}

onMounted(() => {
  favoritesStore.loadFavorites();
});
</script>

<style scoped>
</style>
