<template>
  <div class="container mx-auto w-full">
    <mobile-only-component>
      <n-page-header :on-back="handleBack" class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Авторизация
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4 px-4">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <nuxt-link :to="{
            name: 'index'
          }">Главная
            </nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Авторизация
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <div class="mt-[60px] lg:mt-4 w-full max-w-[500px] mx-auto px-4">
      <user-authorization-form></user-authorization-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAuthorizationForm from "~/components/user-authorization-form.vue";
import {NPageHeader} from "naive-ui";


const router = useRouter()


function handleBack() {
  router.back()
}
</script>
