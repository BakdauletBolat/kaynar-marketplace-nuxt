<template>
    <div v-if="isLoading" class="backdrop-filter w-screen h-[80vh] bg-white dark:bg-dark-bg opacity-90 flex justify-center items-center z-20 fixed">
      <n-spin></n-spin>
    </div>
    <div class="flex max-w-[500px] mx-auto min-h-screen px-4 justify-top pt-[60px] pb-8 flex-col bg-light-bg dark:bg-dark-bg">
        <div v-if="tab == 'register'" class="mt-3 w-full flex flex-col gap-2">
          <n-h3 class="!m-0 !p-0">Добро пожаловать!</n-h3>
          <p class="text-gray-600 dark:text-gray-400">
            Чтобы оформлять заказы и добавлять товары в избранное, пожалуйста, зарегистрируйтесь или войдите в аккаунт.
          </p>

          <div class="flex gap-2 flex-col">
            <div class="mt-4 text-gray-700 dark:text-gray-300">У вас уже есть аккаунт?</div>
            <n-button @click="navigateLogin" size="large">Войти</n-button>
            <n-button class="mt-2" text @click="navigateRegister">Регистрация</n-button>
          </div>

          <!-- Theme Switcher -->
          <div class="mt-8 bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-bold text-gray-700 dark:text-gray-200">Тема оформления</span>
            </div>
            <div class="theme-switcher">
              <button
                @click="setTheme('light')"
                class="theme-option"
                :class="{ 'theme-option-active': themeMode === 'light' }"
              >
                <SunIcon class="w-5 h-5" />
                <span>Светлая</span>
              </button>
              <button
                @click="setTheme('dark')"
                class="theme-option"
                :class="{ 'theme-option-active': themeMode === 'dark' }"
              >
                <MoonIcon class="w-5 h-5" />
                <span>Тёмная</span>
              </button>
              <button
                @click="setTheme('system')"
                class="theme-option"
                :class="{ 'theme-option-active': themeMode === 'system' }"
              >
                <SystemIcon class="w-5 h-5" />
                <span>Авто</span>
              </button>
            </div>
          </div>
        </div>
      <div v-if="tab == 'verify'" class="mt-3 w-full flex flex-col gap-2">
        <div class="text-xl text-gray-900 dark:text-white">Введите код из SMS, который мы отправили на ваш номер:</div>
        <div class="flex justify-center">
          <v-otp-input
              ref="otpInput"
              class="w-full justify-center mt-4"
              input-classes="otp-input"
              inputmode="numeric"
              :conditionalClass="['one', 'two', 'three', 'four']"
              separator="-"
              inputType="letter-numeric"
              :num-inputs="4"
              v-model:value="bindValue"
              :should-auto-focus="true"
              :should-focus-order="true"
              @on-complete="handleOnComplete"
              :placeholder="['*', '*', '*', '*']"
          />
        </div>
        <n-button class="mt-4" @click="tab='register'">Отправить код еще раз</n-button>
        <p class="text-gray-600 dark:text-gray-400 mt-4">Код действует в течение 5 минут.</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NButton, NH3, NInput } from "naive-ui";
import {
  SunnyOutline as SunIcon,
  MoonOutline as MoonIcon,
  PhonePortraitOutline as SystemIcon
} from "@vicons/ionicons5";
import IMask from "imask";
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "~/storages/auth-store";
import { useTheme } from "~/composables/useTheme";

const { themeMode, setTheme } = useTheme();

const tab = ref('register');

const router = useRouter();
const message = useMessage();
const isLoading = ref(false);
const authStore = useAuthStore();

const phone = ref('+7 (');
const token = useCookie("token", {
  maxAge: 10000,
});
const maskOptions = {
  mask: "+{7} (000) 000 00 00",
};
let mask = null;
onMounted(() => {
  if (document.querySelector(".imask-elem") !== null) {
    mask = IMask(
        document!.querySelector(".imask-elem")!.querySelector("input")!,
        maskOptions,
    );
    console.log(mask);
  }
});

watch(tab, (state) => {
  if (document.querySelector(".imask-elem") !== null) {
    mask = IMask(
        document!.querySelector(".imask-elem")!.querySelector("input")!,
        maskOptions,
    );
  }
})

function userRegisterOTP() {
  if (mask!.unmaskedValue.length != 11) {
    message.warning("Пожалуйста, введите ваш номер телефона, чтобы мы могли отправить вам код подтверждения.")
    return;
  }
  isLoading.value = true;
  authStore.register("+"+mask!.unmaskedValue).then(res=>{
    tab.value = 'verify';
  }).finally(()=>{
    isLoading.value = false;
  }).catch(res=>{
    if (res.response && res.response.status == 400) {
      message.error(res.response.data.status);
      message.error("😓 Упс! При обработке вашего номера произошла ошибка. Пожалуйста, попробуйте еще раз.", {
        duration: 5000
      })
    }
  })
}

function navigateLogin() {
  router.push({
    name: "auth-login",
  });
}

function navigateRegister() {
  router.push({
    name: "auth-register",
  });
}

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindValue = ref("");

const handleOnComplete = (value: string) => {
  isLoading.value = true;
  authStore.confirm("+"+mask!.unmaskedValue, value).then(res=>{
    token.value = res.data.access;
    router.push({
      name: 'auth-profile'
    })
  }).catch(res=>{
    if (res.response && res.response.status >= 400) {
      message.error(res.response.data.details);
    }
    console.log(res);
  }).finally(()=>{
    isLoading.value = false;
  })
};


</script>

<style scoped>
.theme-switcher {
  @apply flex gap-2 p-1 bg-gray-100 dark:bg-white/5 rounded-xl;
}

.theme-option {
  @apply flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg;
  @apply text-gray-500 dark:text-gray-400 text-xs font-medium;
  @apply transition-all duration-200 active:scale-95;
}

.theme-option-active {
  @apply bg-white dark:bg-dark-card text-primary shadow-sm;
}
</style>

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
