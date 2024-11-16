<template>
    <div class="flex p-4 rounded-lg bg-white flex-col gap-3">
        <div class="text-2xl font-bold">Доставка</div>
        <radio-group
            v-model="orderStore.deliveryTypeId"
            class="flex flex-col gap-3"
        >
            <radio-group-option v-slot="{ checked }" value="1">
                <div
                    class="flex justify-between cursor-pointer p-3"
                    :class="{
                        'bg-slate-100': checked,
                    }"
                >
                    <div class="flex flex-col">
                        <h3 class="font-bold text-lg">LP express</h3>
                        <p class="text-gray-500 font-light">
                            В следующем месяце, 2024 03 04
                        </p>
                    </div>
                    <div>
                        <div>42,40 €</div>
                    </div>
                </div>
            </radio-group-option>
            <radio-group-option v-slot="{ checked }" value="2">
                <div
                    class="flex justify-between cursor-pointer p-3"
                    :class="{
                        'bg-slate-100': checked,
                    }"
                >
                    <div class="flex flex-col">
                        <h3 class="font-bold text-lg">Заберите сам</h3>
                        <p class="text-gray-500 font-light"></p>
                    </div>
                    <div>
                        <div>42,40 €</div>
                    </div>
                </div>
            </radio-group-option>
            <radio-group-option v-slot="{ checked }" value="3">
                <div
                    class="flex justify-between cursor-pointer p-3"
                    :class="{
                        'bg-slate-100': checked,
                    }"
                >
                    <div class="flex flex-col">
                        <h3 class="font-bold text-lg">FedEx Plus</h3>
                        <p class="text-gray-500 font-light">
                            Сегодня, 2024 03 04
                        </p>
                    </div>
                    <div>
                        <div>42,40 €</div>
                    </div>
                </div>
            </radio-group-option>
        </radio-group>
        <n-button
            type="primary"
            round
            @click="() => orderStore.changeTab(2)"
            class="mt-3"
            >Продолжить</n-button
        >
    </div>
</template>
<script setup lang="ts">
import { useOrderStore } from "~/storages/order-store.ts";

const orderStore = useOrderStore();
</script>
