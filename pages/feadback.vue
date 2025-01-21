<template>
<div class="mx-auto container">
  <mobile-only-component>
    <n-page-header :on-back="handleBack" class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
      <template #title>
      <span style="text-decoration: none; color: inherit">
        Покупка в один клик
      </span>
      </template>
    </n-page-header>
  </mobile-only-component>
  <desktop-only-component>
    <div class="mt-4 container px-4 mx-auto">
      <n-breadcrumb>
        <n-breadcrumb-item><nuxt-link :to="{
            name: 'index'
          }">Главная
        </nuxt-link></n-breadcrumb-item>
        <n-breadcrumb-item>
          Покупка в один клик
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
  </desktop-only-component>
    <div class="w-full h-[90vh] px-4 flex justify-center items-center flex-col gap-2 max-w-[400px] mx-auto">
      <h1 class="text-2xl">Поможем выбрать запчасти для вашего автомобиля!</h1>
        <p>Не можете найти нужную запчасть? Оставьте свои контактные данные, и наши специалисты свяжутся с вами, чтобы помочь в выборе.</p>
        <n-input class="mt-4" v-model:value="feedbackStore.phone" placeholder="Введите номер телефона"></n-input>
        <n-input v-model:value="feedbackStore.nickname" placeholder="Введите имя"></n-input>
        <n-button :loading="feedbackStore.isLoading" @click="onSubmit" class="w-full" type="primary">Связаться с нами</n-button>
    </div>
</div>
</template>
<script setup lang="ts">
import {NInput, NButton, NPageHeader} from 'naive-ui';
import { useFeadBackStore } from '~/stores/feadback-store';
import { useRouter } from "vue-router";

const router = useRouter();

const feedbackStore = useFeadBackStore();
const message = useMessage();

function handleBack() {
  router.back();
}

const onSubmit = async () => {
    if (feedbackStore.phone === '' || feedbackStore.nickname === '') {
        return;
    }

    await feedbackStore.createFeadback();
    message.success('Спасибо! 🎉 Ваша заявка принята! Сейчас вы будете перенаправлены на главную страницу.');
    setTimeout(()=>{
        router.push('/')
    }, 3000);
}

</script>