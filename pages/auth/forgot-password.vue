<template>
  <div class="min-h-screen bg-light-bg dark:bg-dark-bg font-sans">
    <!-- Header for desktop -->
    <desktop-only-component>
      <div class="pt-6 container px-4 mx-auto">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <nuxt-link :to="{ name: 'index' }" class="text-gray-400 hover:text-primary transition-colors">Главная</nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            <nuxt-link :to="{ name: 'auth-login' }" class="text-gray-400 hover:text-primary transition-colors">Вход</nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            <span class="text-gray-600 dark:text-gray-300">Восстановление пароля</span>
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>

    <!-- Mobile Back Button -->
    <mobile-only-component>
       <div class="p-4 flex items-center gap-4">
          <button @click="handleBack" class="p-2 -ml-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <h1 class="text-xl font-bold text-light-text-main dark:text-dark-text-main">Восстановление пароля</h1>
       </div>
    </mobile-only-component>

    <div class="flex items-center justify-center py-10 lg:py-20 px-4">
      <div class="w-full max-w-[440px]">
        <user-password-reset-form></user-password-reset-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserPasswordResetForm from "~/components/user-password-reset-form.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const router = useRouter()

function handleBack() {
  router.back()
}
</script>
