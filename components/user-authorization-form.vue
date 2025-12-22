<template>
    <div class="w-full bg-white dark:bg-dark-card p-6 lg:p-10 rounded-3xl shadow-xl border border-transparent dark:border-white/5">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-light-text-main dark:text-dark-text-main">Вход в аккаунт</h1>
            <p class="text-sm text-gray-500 mt-2">Введите свои данные для доступа к покупкам</p>
        </div>

        <div v-if="user" class="w-full">
            <n-form class="w-full" :model="user" ref="formRef" :rules="rules">
                <n-form-item label="Номер телефона" path="phone">
                    <n-input
                        class="w-full imask-elem !h-12 !rounded-xl"
                        v-model:value="user.phone"
                        placeholder="+7 (___) ___-__-__"
                        size="large"
                    />
                </n-form-item>
                <n-form-item label="Пароль" path="password">
                    <n-input
                        v-model:value="user.password"
                        type="password"
                        maxlength="128"
                        minlength="1"
                        placeholder="Введите пароль"
                        class="!h-12 !rounded-xl"
                        size="large"
                    />
                </n-form-item>
                
                <div class="mt-4">
                   <n-button
                      class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-lg shadow-purple-500/20"
                      :loading="isLoading"
                      type="primary"
                      @click="handleSubmit"
                      >Войти</n-button
                   >
                </div>

                <div class="mt-6 text-center">
                   <nuxt-link :to="{name: 'auth-register'}" class="text-primary hover:text-primary-hover font-semibold text-sm transition-colors">
                     Нет аккаунта? Зарегистрироваться
                   </nuxt-link>
                </div>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import {
    type UserAuthPayload,
    useAuthStore,
    rules,
} from "@/storages/auth-store";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import axiosInstance from "@/api";
import IMask from "imask";

const formRef = ref();
const isLoading = ref(false);

const router = useRouter();
const message = useMessage();
const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 7, // 1 week
});
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

let mask = null;
onMounted(() => {
    const input = document.querySelector(".imask-elem")?.querySelector("input");
    if (input) {
        mask = IMask(input, {
            mask: "+{7} (000) 000 00 00",
        });
    }
});

function handleOnSuccess(res: any) {
    token.value = res.data.access;
    message.success("С возвращением!");
    router.push({
        name: "auth-profile",
    });
}

function handleOnFail(e: any) {
    message.error("Неверный логин или пароль");
    console.error(e);
}

function auth(form: UserAuthPayload) {
    isLoading.value = true;
    const cleanPhone = mask ? "+" + mask.unmaskedValue : form.phone;
    
    axiosInstance
        .post("/api/users/token/", { ...form, phone: cleanPhone })
        .then(handleOnSuccess)
        .catch(handleOnFail)
        .finally(() => (isLoading.value = false));
}

const handleSubmit = () => {
    formRef.value.validate((errors: any) => {
        if (!errors) {
            auth(user.value);
            return;
        }
    });
};
</script>
