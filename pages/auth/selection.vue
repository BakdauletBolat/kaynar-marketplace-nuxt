<template>
    <div v-if="isLoading" class="backdrop-filter w-screen h-[80vh] bg-white opacity-90 flex justify-center items-center z-20 fixed">
      <n-spin></n-spin>
    </div>
    <div class="flex max-w-[500px] mx-auto h-screen px-4 justify-top mt-[60px] flex-col">
        <div v-if="tab == 'register'" class="mt-3 w-full flex flex-col gap-2">
          <n-h3 class="!m-0 !p-0">Добро пожаловать! 👋 </n-h3>
          <p>
            Чтобы оформлять заказы и добавлять товары в избранное, пожалуйста, зарегистрируйтесь или войдите в аккаунт.
          </p>
          <n-input
              class="w-full imask-elem"
              v-model:value="phone"
              placeholder="+7 (___) ___-__-__"
          />
          <div class="flex gap-2 flex-col">
            <n-button type="primary" @click="userRegisterOTP">Продолжить через SMS</n-button>
            <div class="mt-4">У вас уже есть аккаунт?</div>
            <n-button @click="navigateLogin">Войти</n-button>
            <n-button class="mt-2" text @click="navigateRegister">Регистрация</n-button>
          </div>
        </div>
      <div v-if="tab == 'verify'" class="mt-3 w-full flex flex-col gap-2">
        <div class="text-xl">Введите код из SMS, который мы отправили на ваш номер:</div>
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
        <p class="text-gray-600 mt-4">Код действует в течение 5 минут.</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {NButton, NH3, NInput} from "naive-ui";
import IMask from "imask";
import VOtpInput from "vue3-otp-input";
import {useAuthStore} from "~/storages/auth-store";

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

<style>
n-layout-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}
.otp-input {
  width: 50px;
  height: 50px;
  margin: 0 15px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #ffe85d;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
