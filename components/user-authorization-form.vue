<template>
    <div class="max-w-[400px] w-full">
        <div v-if="user" class="flex w-full justify-center items-center">
            <n-form class="w-full" :model="user" ref="formRef" :rules="rules">
                <n-form-item label="Телефон" path="phone">
                    <n-input
                        class="w-full imask-elem"
                        v-model:value="user.phone"
                        placeholder="+7 (___) ___-__-__"
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
                    >Авторизация</n-button
                >
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    type UserAuthPayload,
    useAuthStore,
    rules,
} from "@/storages/auth-store";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import axiosInstance from "@/api";
import IMask from "imask";
const formRef = ref();
const isLoading = ref();

const router = useRouter();
const message = useMessage();
const token = useCookie("token", {
    maxAge: 10000,
});
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

function handleOnSuccess(res: any) {
    token.value = res.data.access;
    router.push({
        name: "auth-profile",
    });
}

function handleOnFail(e: any) {
    message.error(`Ошибка при авторизаций ${e}`);
}

function auth(form: UserAuthPayload) {
    isLoading.value = true;
    form.phone = "+" + mask.unmaskedValue;
    axiosInstance
        .post("/api/users/token/", form)
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
        message.error("Введите все поля");
    });
};
</script>
