<template>
  <main class="container mx-auto">
    <mobile-only-component>
      <n-page-header class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Корзина
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4">
        <n-breadcrumb>
          <n-breadcrumb-item><nuxt-link :to="{
            name: 'index'
          }">Главная
          </nuxt-link></n-breadcrumb-item>
          <n-breadcrumb-item>
            Корзина
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <section class="mt-[60px] px-4 lg:mt-4 max-w-[800px] mx-auto">
      <div v-if="cardStorage.goods.value.length > 0">
        <user-card></user-card>
        <n-button
            size="large"
            round
            class="w-full"
            @click="navigateToOrder"
            type="primary"
        >Оформить заказ</n-button>
      </div>
      <section v-else class="w-full max-w-[400px] mx-auto flex flex-col mt-8">
        <!-- Сообщение -->
        <h1 class="text-lg text-center font-semibold">Ваша корзина пуста</h1>
        <p class="text-center mb-6">
          Вы пока не добавили товары в корзину. Начните покупки, чтобы заполнить её.
        </p>
        <!-- Кнопка действия -->
        <n-button @click="routeToCatalog" type="primary">Перейти к покупкам</n-button>
      </section>
    </section>
  </main>
</template>
<script lang="ts" setup>

import {defineComponent} from "vue";
import {NButton, NPageHeader} from "naive-ui";

const router = useRouter();
const cardStorage = CardStorage.getInstance();

function routeToCatalog() {
  router.push({
    name: "catalog",
  })
}

function navigateToOrder() {
  router.push({
    name: "order-create"
  })
}
</script>