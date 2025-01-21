<script setup lang="ts">

import {NPageHeader} from "naive-ui";
import {useAuthStore} from "~/storages/auth-store";

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
  <main class="container mx-auto">
    <mobile-only-component>
      <n-page-header @back="handleBack" class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Настройки профиля
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <nuxt-link :to="{
            name: 'index'
          }">Главная
            </nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Настройки профиля
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <section class="mt-[60px] lg:mt-4 px-4">
      <div class="flex w-full justify-center items-center" v-if="authStore.isLoadingUser">
        <n-spin></n-spin>
      </div>
      <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          v-else
      >
        <n-form-item label="Имя" path="first_name">
          <n-input v-model:value="formValue.first_name" placeholder="Укажите имя"/>
        </n-form-item>
        <n-form-item label="Фамилия" path="last_name">
          <n-input v-model:value="formValue.last_name" placeholder="Укажите фамилию"/>
        </n-form-item>
        <n-form-item label="Почта" path="email">
          <n-input v-model:value="formValue.email" placeholder="Укажите почту"/>
        </n-form-item>
        <n-button @click="updateInfo" type="primary" class="w-full">Сохранить</n-button>
      </n-form>
    </section>
  </main>
</template>

<style scoped>

</style>