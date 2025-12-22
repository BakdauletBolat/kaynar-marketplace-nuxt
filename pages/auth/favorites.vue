<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-24 lg:pb-12 font-sans">
    
    <!-- Mobile Header -->
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Избранное</h1>
    </div>

    <!-- Desktop Breadcrumbs -->
    <desktop-only-component>
      <div class="container mx-auto px-4 mt-6">
        <n-breadcrumb>
          <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
          <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Избранное</span></n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>

    <section class="container mx-auto px-2 lg:px-4 py-6">
      <template v-if="favoritesStore.favorites.length > 0">
         <favorites-list :items="favoritesStore.favorites"></favorites-list>
      </template>
      
      <div v-else class="flex flex-col items-center justify-center mt-20 text-center">
        <div class="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
           <HeartIcon class="w-10 h-10 text-gray-400" />
        </div>
        <h2 class="text-xl font-bold text-light-text-main dark:text-dark-text-main mb-2">В избранном пока пусто</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
          Сохраняйте товары, которые вам понравились, чтобы вернуться к ним позже
        </p>
        <n-button @click="routeToCatalog" type="primary" size="large" round class="px-8 font-semibold">
          Перейти в каталог
        </n-button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, HeartIcon } from "@heroicons/vue/24/outline";
import FavoritesList from "@/components/favorites-list.vue";
import { useFavoritesStore } from "~/storages/favorites-store";

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
