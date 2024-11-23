<template>
    <div class="container mx-auto p-6">
        <div class="p-4 bg-white rounded shadow">
            <h2 class="text-xl font-semibold mb-2">Избранные товары</h2>
            <favorites-list :items="favoritesStore.favorites"></favorites-list>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/storages/auth-store";
import FavoritesList from "@/components/favorites-list.vue";
import { useFavoritesStore } from "~/storages/favorites-store";

const favoritesStore = useFavoritesStore();

onMounted(() => {
    favoritesStore.loadFavorites();
});
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
