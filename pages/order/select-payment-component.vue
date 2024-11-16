<template>
    <div class="flex rounded-lg p-4 bg-white flex-col gap-3">
        <div class="text-2xl font-bold">Оплата</div>
        <radio-group
            v-model="orderStore.paymentTypeId"
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
                        <h3 class="text-lg">Банковская карта</h3>
                    </div>
                    <div>
                        <div>
                            <credit-card-icon
                                class="w-5 h-5"
                            ></credit-card-icon>
                        </div>
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
                        <h3 class="text-lg">Наличные</h3>
                    </div>
                    <div>
                        <div>
                            <banknotes-icon class="w-5 h-5"></banknotes-icon>
                        </div>
                    </div>
                </div>
            </radio-group-option>
        </radio-group>
        <n-button type="primary" round>Продолжить</n-button>
    </div>
</template>
<script setup lang="ts">
import { useOrderStore } from "~/storages/order-store";
const orderStore = useOrderStore();
</script>
