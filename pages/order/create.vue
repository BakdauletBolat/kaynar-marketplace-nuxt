<template>
    <client-only>
        <main class="container px-4 mx-auto p-3">
            <tab-group :selected-index="orderStore.activeTab" @change="orderStore.changeTab">
                <tab-list class="grid grid-cols-2 lg:grid-cols-4 p-3 justify-center gap-2">
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
                                    class="flex p-4 bg-white rounded-lg flex-col gap-3">
                                    <h1 class="font-bold text-2xl"> Спасибо за ваш заказ! 🎉 </h1>
                                    <p>Ваш заказ успешно оформлен.</p>
                                    <p>Номер вашего заказа: <span class="font-bold">#{{ orderStore.order.id }}</span></p>
                                    <p>Ожидайте звонка от нашего менеджера в ближайшее время.</p>
                                </div>
                                <section class="mx-auto container px-4">
                                    <h3 class="mt-4 md:px-0 text-base">
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
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { NButton } from "naive-ui";
import { MapIcon, CheckBadgeIcon } from "@heroicons/vue/24/outline";
import UserCard from "~/components/user-card.vue";
import AddressWithUserInfoComponent from "./address-with-user-info-component.vue";
import { useOrderStore } from "~/storages/order-store";
import { CardStorage } from '@/storages/storage';

const cardStorage = CardStorage.getInstance();
const orderStore = useOrderStore();
const productStore = useProductStore();


onMounted(() => {
    orderStore.changeTab(0);
    productStore.loadPopularProducts({});
});

</script>
