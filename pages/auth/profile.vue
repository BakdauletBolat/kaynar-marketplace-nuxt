<template>
    <div class="container mx-auto p-6">
        <!-- Greeting -->
        <h1 class="text-2xl font-bold mb-4">
            Привет, {{ authStore.user.first_name }}!
        </h1>

        <!-- Tabs -->
        <n-tabs type="bar" class="mb-6" v-model:active-key="activeTab">
            <n-tab-pane name="userInfo" tab="Информация о пользователе">
                <!-- User Information -->
                <div class="p-4 bg-white rounded shadow">
                    <h2 class="text-xl font-semibold mb-2">
                        Информация о пользователе
                    </h2>
                    <p>Имя: {{ authStore.user.first_name }}</p>
                    <p>Телефон: {{ authStore.user.phone }}</p>
                    <p>Email: {{ authStore.user.email }}</p>
                    <!-- Add more user details as needed -->
                </div>
            </n-tab-pane>
            <n-tab-pane name="addresses" tab="Адреса">
                <!-- User Addresses -->
                <div class="p-4 bg-white rounded shadow">
                    <h2 class="text-xl font-semibold mb-2">Адреса</h2>
                    <ul>
                        <li v-for="address in userAddresses" :key="address.id">
                            {{ address.street }}, {{ address.city }}
                        </li>
                    </ul>
                </div>
            </n-tab-pane>
            <n-tab-pane name="favorites" tab="Избранные товары">
                <!-- User Favorite Items -->
                <div class="p-4 bg-white rounded shadow">
                    <h2 class="text-xl font-semibold mb-2">Избранные товары</h2>
                    <ul>
                        <li v-for="item in favoriteItems" :key="item.id">
                            {{ item.name }} - {{ item.price }} ₽
                        </li>
                    </ul>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import { useAuthStore } from "~/storages/auth-store";

// Sample user data
const token = useCookie("token");
const authStore = useAuthStore();
const userName = ref("Иван Иванов");
const userEmail = ref("ivan.ivanov@example.com");
const userAddresses = ref([
    { id: 1, street: "Ленина 1", city: "Алматы" },
    { id: 2, street: "Абая 5", city: "Алматы" },
]);
const favoriteItems = ref([
    { id: 1, name: "Пицца", price: 800 },
    { id: 2, name: "Суши", price: 1200 },
]);

onMounted(() => {
    authStore.loadUser();
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
