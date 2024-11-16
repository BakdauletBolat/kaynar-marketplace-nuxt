<template>
    <div class="max-w-[400px] w-full">
        <div v-if="user" class="flex w-full justify-center items-center">
            <n-form class="w-full" :model="user" ref="formRef" :rules="rules">
                <n-form-item label="Телефон" path="phone">
                    <n-input
                        v-model:value="user.phone"
                        class="w-full imask-elem"
                        placeholder="+7 (___) ___-__-__"
                    />
                </n-form-item>
                <n-form-item label="Имя" path="first_name">
                    <n-input
                        v-model:value="user.first_name"
                        placeholder="Введите имя"
                    />
                </n-form-item>
                <n-form-item label="Фамилия" path="last_name">
                    <n-input
                        v-model:value="user.last_name"
                        placeholder="Введите фамилию"
                    />
                </n-form-item>
                <n-form-item label="Отчество" path="middle_name">
                    <n-input
                        v-model:value="user.middle_name"
                        placeholder="Введите отчество"
                    />
                </n-form-item>
                <n-form-item label="Пароль" path="password">
                    <n-input
                        v-model:value="user.password"
                        type="password"
                        maxlength="128"
                        minlength="1"
                        placeholder="Введите пароль"
                    />
                </n-form-item>
                <n-button
                    class="w-full"
                    round
                    :loading="isLoading"
                    type="primary"
                    @click="handleSubmit"
                    >Регистрация</n-button
                >
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
