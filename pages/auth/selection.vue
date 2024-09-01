<template>
    <div class="flex h-[200px] justify-center items-center flex-col">
        <n-h3 class="!m-0 !p-0">Добро пожаловать! Kaynar - avto </n-h3>
        <p>
            Чтобы получить полный доступ к нашему сервису, пожалуйста,
            авторизуйтесь или зарегистрируйтесь
        </p>
        <n-space class="mt-3" horizontal size="large" align="center">
            <n-button type="primary" @click="goToRegister"
                >Регистрация</n-button
            >
            <n-button type="default" @click="goToLogin">Авторизация</n-button>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NCard, NButton, NSpace, NH3 } from "naive-ui";

const router = useRouter();

const goToRegister = () => {
    router.push("/auth/register");
};

const goToLogin = () => {
    router.push("/auth/login");
};
</script>

<style scoped>
n-layout-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}
</style>
