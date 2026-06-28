<template>
    <div class="w-full bg-white dark:bg-dark-card p-6 lg:p-10 rounded-3xl shadow-xl border border-transparent dark:border-white/5">
        <!-- Экран 1 — запрос кода -->
        <div v-if="tab == 'request'" class="w-full">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-light-text-main dark:text-dark-text-main">Восстановление пароля</h1>
                <p class="text-sm text-gray-500 mt-2">Укажите номер телефона — мы отправим код в SMS</p>
            </div>

            <n-form class="w-full" :model="form" ref="requestFormRef" :rules="requestRules">
                <n-form-item label="Номер телефона" path="phone">
                    <n-input
                        class="w-full imask-elem !h-12 !rounded-xl"
                        v-model:value="form.phone"
                        placeholder="+7 (___) ___-__-__"
                        size="large"
                    />
                </n-form-item>

                <div class="mt-4">
                    <n-button
                        class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-lg shadow-primary/20"
                        :loading="isLoading"
                        type="primary"
                        @click="handleRequest"
                    >Отправить код</n-button>
                </div>

                <div class="mt-6 text-center">
                   <nuxt-link :to="{name: 'auth-login'}" class="text-primary hover:text-primary-hover font-semibold text-sm transition-colors">
                     Вспомнили пароль? Войти
                   </nuxt-link>
                </div>
            </n-form>
        </div>

        <!-- Экран 2 — ввод кода и нового пароля -->
        <div v-if="tab == 'confirm'" class="w-full">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-light-text-main dark:text-dark-text-main">Новый пароль</h1>
                <p class="text-sm text-gray-500 mt-2">Если номер зарегистрирован, мы отправили код в SMS</p>
            </div>

            <div class="flex justify-center">
                <v-otp-input
                    ref="otpInput"
                    class="w-full justify-center mb-2"
                    input-classes="otp-input"
                    inputmode="numeric"
                    :conditionalClass="['one', 'two', 'three', 'four']"
                    separator="-"
                    inputType="letter-numeric"
                    :num-inputs="4"
                    v-model:value="bindValue"
                    :should-auto-focus="true"
                    :should-focus-order="true"
                    :placeholder="['*', '*', '*', '*']"
                />
            </div>
            <p class="text-gray-500 text-sm text-center mb-6">Код действует в течение 5 минут.</p>

            <n-form class="w-full" :model="form" ref="confirmFormRef" :rules="confirmRules">
                <n-form-item label="Новый пароль" path="new_password">
                    <n-input
                        v-model:value="form.new_password"
                        type="password"
                        maxlength="128"
                        minlength="1"
                        placeholder="Введите новый пароль"
                        class="!h-12 !rounded-xl"
                        size="large"
                    />
                </n-form-item>
                <n-form-item label="Повторите пароль" path="repeat_password">
                    <n-input
                        v-model:value="form.repeat_password"
                        type="password"
                        maxlength="128"
                        minlength="1"
                        placeholder="Повторите новый пароль"
                        class="!h-12 !rounded-xl"
                        size="large"
                    />
                </n-form-item>

                <div class="mt-4">
                    <n-button
                        class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-lg shadow-primary/20"
                        :loading="isLoading"
                        type="primary"
                        @click="handleConfirm"
                    >Сохранить пароль</n-button>
                </div>

                <n-button class="mt-4 w-full" @click="backToRequest">Отправить код заново</n-button>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import VOtpInput from "vue3-otp-input";
import IMask from "imask";
import { useAuthStore } from "@/storages/auth-store";

const router = useRouter();
const message = useMessage();
const authStore = useAuthStore();

const tab = ref("request");
const isLoading = ref(false);
const bindValue = ref("");
const cleanPhone = ref("");
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

const requestFormRef = ref();
const confirmFormRef = ref();

const form = ref({
    phone: "",
    new_password: "",
    repeat_password: "",
});

const requestRules = {
    phone: {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
    },
};

const confirmRules = {
    new_password: {
        required: true,
        message: "Введите новый пароль",
        trigger: "blur",
    },
    repeat_password: {
        required: true,
        message: "Повторите новый пароль",
        trigger: "blur",
    },
};

const maskOptions = {
    mask: "+{7} (000) 000 00 00",
};
let mask: any = null;

function initMask() {
    const input = document.querySelector(".imask-elem")?.querySelector("input");
    if (input) {
        mask = IMask(input, maskOptions);
    }
}

onMounted(() => {
    initMask();
});

function handleRequest() {
    requestFormRef.value.validate((errors: any) => {
        if (errors) {
            return;
        }
        if (!mask || mask.unmaskedValue.length != 11) {
            message.warning("Пожалуйста, введите корректный номер телефона.");
            return;
        }
        cleanPhone.value = "+" + mask.unmaskedValue;
        isLoading.value = true;
        authStore
            .passwordResetRequest(cleanPhone.value)
            .then(() => {
                message.info("Если номер зарегистрирован, мы отправили код в SMS");
                tab.value = "confirm";
            })
            .catch(() => {
                message.error("Не удалось отправить код, попробуйте ещё раз");
            })
            .finally(() => (isLoading.value = false));
    });
}

function handleConfirm() {
    confirmFormRef.value.validate((errors: any) => {
        if (errors) {
            return;
        }
        if (bindValue.value.length != 4) {
            message.warning("Введите 4-значный код из SMS");
            return;
        }
        if (form.value.new_password !== form.value.repeat_password) {
            message.error("Пароли не совпадают");
            return;
        }
        isLoading.value = true;
        authStore
            .passwordResetConfirm(cleanPhone.value, bindValue.value, form.value.new_password)
            .then(() => {
                message.success("Пароль успешно изменён");
                router.push({ name: "auth-login" });
            })
            .catch(handleConfirmError)
            .finally(() => (isLoading.value = false));
    });
}

function handleConfirmError(e: any) {
    const status = e.response?.status;
    const data = e.response?.data || {};

    if (status === 422) {
        // Время кода истекло / Неправильный код
        message.error(data.detail || "Ошибка проверки кода");
        if (data.detail === "Время кода истекло") {
            // код просрочен — предложить запросить новый
            backToRequest();
        } else {
            // неверный код — дать ввести ещё раз
            bindValue.value = "";
        }
        return;
    }

    if (status === 400) {
        if (Array.isArray(data.error)) {
            // слабый пароль — показать сообщения из массива
            data.error.forEach((msg: string) => message.error(msg));
        } else if (data.phone) {
            message.error(Array.isArray(data.phone) ? data.phone[0] : data.phone);
        } else if (data.otp) {
            message.error(Array.isArray(data.otp) ? data.otp[0] : data.otp);
        } else if (data.new_password) {
            message.error(Array.isArray(data.new_password) ? data.new_password[0] : data.new_password);
        } else {
            message.error("Проверьте введённые данные");
        }
        return;
    }

    message.error("Что-то пошло не так, попробуйте ещё раз");
}

function backToRequest() {
    bindValue.value = "";
    form.value.new_password = "";
    form.value.repeat_password = "";
    tab.value = "request";
    nextTick(() => initMask());
}
</script>

<style>
.otp-input {
  width: 50px;
  height: 50px;
  margin: 0 15px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  background: white;
  color: #333;
}

.dark .otp-input {
  background: #202022;
  border-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.otp-input.is-complete {
  background-color: #ffe85d;
  color: #333;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.otp-input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
