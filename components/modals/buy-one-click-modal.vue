<template>
  <n-modal v-model:show="show" preset="card" title="Быстрая покупка" class="max-w-[400px]">
    <div class="space-y-4">
      <p class="text-sm text-gray-500">
        Оставьте номер, и мы перезвоним вам для оформления заказа на 
        <span class="font-bold text-gray-900 dark:text-white">{{ productName }}</span>
      </p>

      <n-input
        v-model:value="phone"
        placeholder="+7 (___) ___-__-__"
        size="large"
        class="!rounded-xl"
      />
      
      <n-input
        v-model:value="name"
        placeholder="Ваше имя"
        size="large"
        class="!rounded-xl"
      />

      <n-button
        type="primary"
        size="large"
        block
        class="!rounded-xl !font-bold !h-12 shadow-lg shadow-primary/20"
        :loading="isLoading"
        :disabled="!isValid"
        @click="submit"
      >
        Отправить заявку
      </n-button>
      
      <p class="text-[10px] text-center text-gray-400">
        Менеджер свяжется с вами в течение 15 минут
      </p>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NModal, NInput, NButton, useMessage } from 'naive-ui';
import { useFeadBackStore } from '~/stores/feadback-store';

const props = defineProps<{
  productName: string;
  productId: number;
}>();

const show = defineModel<boolean>('show');
const message = useMessage();
const feedbackStore = useFeadBackStore();

const phone = ref('');
const name = ref('');
const isLoading = ref(false);

const isValid = computed(() => phone.value.length > 5 && name.value.length > 1);

async function submit() {
  if (!isValid.value) return;
  
  isLoading.value = true;
  try {
    // We reuse feedback store logic but maybe append product info to comment or separate field if API supports
    // For now, assuming standard feedback
    feedbackStore.phone = phone.value;
    feedbackStore.nickname = name.value;
    feedbackStore.comment = `Заявка на товар: ${props.productName} (ID: ${props.productId})`;
    
    await feedbackStore.createFeadback();
    
    message.success('Заявка отправлена! Скоро свяжемся.');
    show.value = false;
    phone.value = '';
    name.value = '';
  } catch (e) {
    message.error('Ошибка отправки. Попробуйте позже.');
  } finally {
    isLoading.value = false;
  }
}
</script>