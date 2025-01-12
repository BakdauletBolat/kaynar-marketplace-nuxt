<template>
<div class="mx-auto container">
    <div class="w-full h-[90vh] px-4 flex justify-center items-center flex-col gap-2 max-w-[400px] mx-auto">
      <h1 class="text-2xl">Поможем выбрать запчасти для вашего автомобиля!</h1>
        <p>Не можете найти нужную запчасть? Оставьте свои контактные данные, и наши специалисты свяжутся с вами, чтобы помочь в выборе.</p>
        <n-input class="mt-4" v-model:value="feadbackStore.phone" placeholder="Введите номер телефона"></n-input>
        <n-input v-model:value="feadbackStore.nickname" placeholder="Введите имя"></n-input>
        <n-button :loading="feadbackStore.isLoading" @click="onSubmit" class="w-full" type="primary">Связаться с нами</n-button>
    </div>
</div>
</template>
<script setup lang="ts">
import { NInput, NButton } from 'naive-ui';
import { useFeadBackStore } from '~/stores/feadback-store';
import { useRouter } from "vue-router";

const router = useRouter();

const feadbackStore = useFeadBackStore();
const message = useMessage();

const onSubmit = async () => {
    if (feadbackStore.phone === '' || feadbackStore.nickname === '') {
        return;
    }

    await feadbackStore.createFeadback();
    message.success('Спасибо! 🎉 Ваша заявка принята! Сейчас вы будете перенаправлены на главную страницу.');
    setTimeout(()=>{
        router.push('/')
    }, 3000);
}

</script>