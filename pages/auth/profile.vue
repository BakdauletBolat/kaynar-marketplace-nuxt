<template>
    <div class="container mx-auto p-6">
        <!-- Greeting -->
        <h1 class="text-2xl font-bold mb-4">
            Привет, {{ authStore.user?.first_name }}!
        </h1>

        <!-- Tabs -->
        <n-tabs type="bar" class="mb-6" v-model:active-key="activeTab">
            <n-tab-pane name="userInfo" tab="Информация о пользователе">
                <div>
                    <p>Имя: {{ authStore.user?.first_name }}</p>
                    <p>Телефон: {{ authStore.user?.phone }}</p>
                    <p>Email: {{ authStore.user?.email }}</p>
                </div>
            </n-tab-pane>
            <n-tab-pane name="favorites" tab="Избранные товары">
                <!-- User Favorite Items -->
                <div class="p-4 bg-white rounded shadow">
                    <h2 class="text-xl font-semibold mb-2">Избранные товары</h2>
                    <favorites-list
                        :items="favoritesStore.favorites"
                    ></favorites-list>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import { useAuthStore } from "~/storages/auth-store";
import FavoritesList from "@/components/favorites-list.vue";
import { useFavoritesStore } from "~/storages/favorites-store";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

onMounted(() => {
    authStore.loadUser();
    favoritesStore.loadFavorites();
});

const activeTab = ref("userInfo");

definePageMeta({
    middleware: "auth",
});
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
