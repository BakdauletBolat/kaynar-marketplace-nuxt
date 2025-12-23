<template>
    <div class="w-full bg-white dark:bg-dark-card p-6 lg:p-10 rounded-3xl shadow-xl border border-transparent dark:border-white/5">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-light-text-main dark:text-dark-text-main">Регистрация</h1>
            <p class="text-sm text-gray-500 mt-2">Создайте аккаунт для покупок</p>
        </div>

        <div v-if="user" class="w-full">
            <n-form class="w-full" :model="user" ref="formRef" :rules="rules">
                <n-form-item label="Номер телефона" path="phone">
                    <n-input
                        v-model:value="user.phone"
                        class="w-full imask-elem !h-12 !rounded-xl"
                        placeholder="+7 (___) ___-__-__"
                        size="large"
                    />
                </n-form-item>
                <n-form-item label="Имя" path="first_name">
                    <n-input
                        v-model:value="user.first_name"
                        placeholder="Введите имя"
                        class="!h-12 !rounded-xl"
                        size="large"
                    />
                </n-form-item>
                <n-form-item label="Фамилия" path="last_name">
                    <n-input
                        v-model:value="user.last_name"
                        placeholder="Введите фамилию"
                        class="!h-12 !rounded-xl"
                        size="large"
                    />
                </n-form-item>
                <n-form-item label="Отчество" path="middle_name">
                    <n-input
                        v-model:value="user.middle_name"
                        placeholder="Введите отчество (необязательно)"
                        class="!h-12 !rounded-xl"
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
                        class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-lg shadow-primary/20"
                        :loading="isLoading"
                        type="primary"
                        @click="handleSubmit"
                    >Зарегистрироваться</n-button>
                </div>

                <div class="mt-6 text-center">
                   <nuxt-link :to="{name: 'auth-login'}" class="text-primary hover:text-primary-hover font-semibold text-sm transition-colors">
                     Уже есть аккаунт? Войти
                   </nuxt-link>
                </div>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type User, useAuthStore, rules } from "@/storages/auth-store";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import IMask from "imask";
import axiosInstance from "@/api";

const formRef = ref();
const isLoading = ref();
const router = useRouter();
const message = useMessage();

const { user } = storeToRefs(useAuthStore());

const maskOptions = {
    mask: "+{7} (000) 000 00 00",
};
let mask = null;
onMounted(() => {
    mask = IMask(
        document.querySelector(".imask-elem").querySelector("input"),
        maskOptions,
    );
});

const token = useCookie("token", {
    maxAge: 10000,
});

function handleAuthOnSuccess(res: any) {
    token.value = res.data.access;
    router.push({
        name: "auth-profile",
    });
}

function handleOnFail(e: any) {
    message.error(`Ошибка при регистраций ${e}`);
}

function auth(form: any) {
    isLoading.value = true;
    axiosInstance
        .post("/api/users/token/", form)
        .then(handleAuthOnSuccess)
        .catch(handleOnFail)
        .finally(() => (isLoading.value = false));
}

function handleOnSuccess(payload: any) {
    auth(payload);
}

function register(form: User) {
    form["password2"] = form.password;
    isLoading.value = true;
    form.phone = "+" + mask.unmaskedValue;
    axiosInstance
        .post("/api/users/", form)
        .then(() =>
            handleOnSuccess({
                phone: form.phone,
                password: form.password,
            }),
        )
        .catch(handleOnFail)
        .finally(() => (isLoading.value = false));
}

const handleSubmit = () => {
    formRef.value.validate((errors: any) => {
        if (!errors && user?.value != undefined) {
            register(user.value);
            return;
        }
        message.error("Введите все поля");
    });
};
</script>
