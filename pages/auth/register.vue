<template>
  <main>
    <mobile-only-component>
      <n-page-header :on-back="handleBack" class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Регистрация
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4 px-4 container mx-auto">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <nuxt-link :to="{
            name: 'index'
          }">Главная
            </nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Регистрация
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <section class="mt-[60px] lg:mt-4">
      <div class="flex flex-col justify-center items-center px-4">
        <user-registration-form></user-registration-form>
      </div>
    </section>
  </main>

</template>

<script setup lang="ts">
import userRegistrationForm from "~/components/user-registration-form.vue";
import {NPageHeader} from "naive-ui";


const router = useRouter()

function handleBack() {
  router.back();
}

</script>
