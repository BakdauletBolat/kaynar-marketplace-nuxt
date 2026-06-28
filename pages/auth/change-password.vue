<script setup lang="ts">
import { ArrowBackOutline as ArrowBackIcon } from "@vicons/ionicons5";
import { useAuthStore } from "~/storages/auth-store";

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();

const formRef = ref();
const isLoading = ref(false);

const rules = {
  old_password: {
    required: true,
    message: "Введите текущий пароль",
    trigger: "blur",
  },
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

const formValue = ref({
  old_password: "",
  new_password: "",
  repeat_password: "",
});

function handleBack() {
  router.push({
    name: 'auth-profile'
  });
}

function handleError(e: any) {
  const data = e.response?.data || {};
  if (Array.isArray(data.error)) {
    data.error.forEach((msg: string) => message.error(msg));
  } else if (data.error) {
    message.error(data.error);
  } else {
    message.error("Не удалось изменить пароль, попробуйте ещё раз");
  }
}

function changePassword() {
  formRef.value.validate((errors: any) => {
    if (errors) {
      return;
    }
    if (formValue.value.new_password !== formValue.value.repeat_password) {
      message.error("Пароли не совпадают");
      return;
    }
    isLoading.value = true;
    authStore
      .changePassword(formValue.value.old_password, formValue.value.new_password)
      .then(() => {
        message.success("Пароль успешно изменен");
        router.push({ name: "auth-profile" });
      })
      .catch(handleError)
      .finally(() => (isLoading.value = false));
  });
}

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <main class="bg-gray-50 dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    <!-- Header -->
    <div class="bg-white dark:bg-dark-card sticky top-0 z-30 px-4 py-3 flex items-center gap-4 shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
      <button @click="handleBack" class="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
        <ArrowBackIcon class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-bold text-gray-900 dark:text-white">Смена пароля</h1>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-[600px]">
      <desktop-only-component>
        <div class="mb-6">
          <n-breadcrumb>
            <n-breadcrumb-item>
              <nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link>
            </n-breadcrumb-item>
             <n-breadcrumb-item>
              <nuxt-link :to="{ name: 'auth-profile' }" class="text-gray-400 hover:text-primary transition-colors">Профиль</nuxt-link>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <span class="text-gray-900 dark:text-white">Смена пароля</span>
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <section class="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
        <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            size="large"
            class="space-y-4"
        >
          <n-form-item label="Текущий пароль" path="old_password" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.old_password" type="password" maxlength="128" placeholder="Введите текущий пароль" />
          </n-form-item>
          <n-form-item label="Новый пароль" path="new_password" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.new_password" type="password" maxlength="128" placeholder="Введите новый пароль" />
          </n-form-item>
          <n-form-item label="Повторите пароль" path="repeat_password" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.repeat_password" type="password" maxlength="128" placeholder="Повторите новый пароль" />
          </n-form-item>

          <div class="pt-4">
             <n-button @click="changePassword" :loading="isLoading" type="primary" size="large" block strong class="font-bold rounded-lg h-12">
               Сохранить пароль
             </n-button>
          </div>
        </n-form>
      </section>
    </div>
  </main>
</template>
