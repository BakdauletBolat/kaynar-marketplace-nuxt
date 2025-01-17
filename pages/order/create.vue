<template>
  <client-only>
    <mobile-only-component>
      <n-page-header class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
        <template #title>
      <span style="text-decoration: none; color: inherit">
        Оформление заказа
      </span>
        </template>
      </n-page-header>
    </mobile-only-component>
    <desktop-only-component>
      <div class="mt-4 container mx-auto">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <nuxt-link :to="{
            name: 'index'
          }">Главная
            </nuxt-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Оформление заказа
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </desktop-only-component>
    <main class="container px-4 mx-auto mt-[60px] lg:mt-4">
      <tab-group :selected-index="orderStore.activeTab" @change="orderStore.changeTab">
        <tab-list class="grid grid-cols-2 lg:grid-cols-4 justify-center gap-2">
          <tab v-slot="{ selected }">
            <n-button class="w-full" :type="selected ? 'primary' : 'default'">
              <template #icon>
                <map-icon class="h-5 w-5"></map-icon>
              </template>
              <div>Адрес</div>
            </n-button>
          </tab>
          <tab v-slot="{ selected }">
            <n-button class="w-full" :type="selected ? 'primary' : 'default'">
              <template #icon>
                <check-badge-icon class="w-5 h-5"></check-badge-icon>
              </template>
              <div>Спасибо!</div>
            </n-button>
          </tab>
        </tab-list>
        <div class="grid lg:grid-cols-[1fr_400px] gap-5">
          <div>
            <tab-panels>
              <tab-panel>
                <address-with-user-info-component></address-with-user-info-component>
              </tab-panel>
              <tab-panel>
                <div v-if="orderStore.order != undefined || orderStore.order != null"
                     class="flex mt-4 bg-white rounded-lg flex-col gap-3">
                  <h1 class="font-bold text-2xl"> Спасибо за ваш заказ! 🎉 </h1>
                  <p>Ваш заказ успешно оформлен.</p>
                  <p>Номер вашего заказа: <span class="font-bold">#{{ orderStore.order.id }}</span></p>
                  <p>Ожидайте звонка от нашего менеджера в ближайшее время.</p>
                </div>
                <n-divider></n-divider>
                <section class="mx-auto container">
                  <h3 class="mt-4 md:px-0 text-lg font-bold">
                    Вам может понадобиться
                  </h3>
                  <div v-if="productStore.popularProducts"
                       class="grid gap-2 md:grid-cols-2 md:gap-3 mt-3">
                    <card :item="item" v-for="item in productStore.popularProducts"></card>
                  </div>
                  <div v-else>
                    <!-- {{ error }} -->
                  </div>
                </section>
              </tab-panel>
            </tab-panels>
          </div>
          <div class="bg-white rounded-lg p-4" v-if="cardStorage.goods.value.length > 0">
            <h2 class="text-xl font-bold">Информация о заказе</h2>
            <client-only>
              <user-card class="mt-3"></user-card>
            </client-only>
          </div>
        </div>
      </tab-group>
    </main>
  </client-only>
</template>
<script lang="ts" setup>
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from "@headlessui/vue";
import {NButton, NPageHeader} from "naive-ui";
import {MapIcon, CheckBadgeIcon} from "@heroicons/vue/24/outline";
import UserCard from "~/components/user-card.vue";
import AddressWithUserInfoComponent from "./address-with-user-info-component.vue";
import {useOrderStore} from "~/storages/order-store";
import {CardStorage} from '@/storages/storage';

const cardStorage = CardStorage.getInstance();
const orderStore = useOrderStore();
const productStore = useProductStore();


onMounted(() => {
  orderStore.changeTab(0);
  productStore.loadPopularProducts({});
});

definePageMeta({
  middleware: "auth",
});

</script>
