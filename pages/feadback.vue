<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen pb-12 font-sans">
    <div class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 py-3 flex items-center gap-4 transition-colors">
       <button @click="handleBack" class="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors lg:hidden">
         <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
       </button>
       <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Помощь в подборе</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[600px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item><nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link></n-breadcrumb-item>
            <n-breadcrumb-item><span class="text-gray-600 dark:text-gray-300">Обратная связь</span></n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <div class="bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-10 shadow-xl border border-transparent dark:border-white/5 text-center">
        <div class="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
           🔍
        </div>
        <h1 class="text-2xl font-black text-light-text-main dark:text-dark-text-main mb-4 leading-tight">Поможем выбрать запчасти для вашего авто</h1>
        <p class="text-gray-500 dark:text-gray-400 mb-10">Не можете найти нужную запчасть? Оставьте свои контактные данные, и наши специалисты свяжутся с вами в течение 15 минут.</p>

        <div class="space-y-4 max-w-[360px] mx-auto">
          <n-input 
            v-model:value="feedbackStore.nickname" 
            placeholder="Ваше имя" 
            size="large" 
            class="!rounded-xl !h-12"
          />
          <n-input 
            v-model:value="feedbackStore.phone" 
            placeholder="Номер телефона" 
            size="large" 
            class="!rounded-xl !h-12"
          />
          
          <div class="pt-4">
             <n-button 
                :loading="feedbackStore.isLoading" 
                @click="onSubmit" 
                type="primary" 
                size="large" 
                class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-lg shadow-purple-500/20"
             >
               Связаться со мной
             </n-button>
          </div>
        </div>

        <p class="mt-8 text-[10px] text-gray-400 leading-relaxed">
          Нажимая на кнопку, вы даете согласие на обработку персональных данных
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NInput, NButton, NBreadcrumb, NBreadcrumbItem, useMessage } from 'naive-ui';
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { useFeadBackStore } from '~/stores/feadback-store';

const router = useRouter();
const feedbackStore = useFeadBackStore();
const message = useMessage();

function handleBack() {
  router.back();
}

const onSubmit = async () => {
    if (!feedbackStore.phone || !feedbackStore.nickname) {
        message.warning('Пожалуйста, заполните все поля');
        return;
    }

    try {
        await feedbackStore.createFeadback();
        message.success('Спасибо! Ваша заявка принята! 🎉');
        setTimeout(() => {
            router.push('/')
        }, 2000);
    } catch (e) {
        message.error('Ошибка при отправке заявки');
    }
}
</script>
