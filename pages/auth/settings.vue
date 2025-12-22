<script setup lang="ts">
import { ArrowBackOutline as ArrowBackIcon } from "@vicons/ionicons5";
import { useAuthStore } from "~/storages/auth-store";

const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();


const rules = {
  email: {},
  first_name: {},
  last_name: {},
};

const formValue = ref({
  email: "",
  last_name: "",
  first_name: "",
})

onMounted(() => {
  authStore.loadUser().then((user: any) => {
    formValue.value.email = user.email;
    formValue.value.first_name = user.first_name;
    formValue.value.last_name = user.last_name;
  });
})

function handleBack() {
  router.push({
    name: 'auth-profile'
  })
}

async function updateInfo() {
  const res = await authStore.updateInfo(authStore.user!.id!, formValue.value).then((res) => {
    message.success("Успешно обновлено")
  })
      .catch((e) => {
        message.error(e)
      })
}
</script>

<template>
  <main class="bg-gray-50 dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    <!-- Header -->
    <div class="bg-white dark:bg-dark-card sticky top-0 z-30 px-4 py-3 flex items-center gap-4 shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
      <button @click="handleBack" class="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
        <ArrowBackIcon class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-bold text-gray-900 dark:text-white">Настройки профиля</h1>
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
              <span class="text-gray-900 dark:text-white">Настройки</span>
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </desktop-only-component>

      <section class="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
        <div class="flex w-full justify-center items-center py-10" v-if="authStore.isLoadingUser">
          <n-spin size="large" />
        </div>
        <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            v-else
            size="large"
            class="space-y-4"
        >
          <n-form-item label="Имя" path="first_name" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.first_name" placeholder="Введите ваше имя" />
          </n-form-item>
          <n-form-item label="Фамилия" path="last_name" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.last_name" placeholder="Введите вашу фамилию" />
          </n-form-item>
          <n-form-item label="Почта" path="email" :show-label="true" label-style="font-weight: 600; color: #4b5563;">
            <n-input v-model:value="formValue.email" placeholder="example@mail.com" />
          </n-form-item>
          
          <div class="pt-4">
             <n-button @click="updateInfo" type="primary" size="large" block strong class="font-bold rounded-lg h-12">
               Сохранить изменения
             </n-button>
          </div>
        </n-form>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* Optional: Customize Naive UI inputs if needed to match perfectly, 
   but defaults are usually fine with the wrapping style */
</style>