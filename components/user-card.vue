<template>
        <div class="w-full">
            <div class="grid grid-cols-1 gap-4" v-if="cardStorage.goods.value.length > 0">
                <basket-card v-for="item in cardStorage.goods.value" :key="item.name" :item="item"></basket-card>
            </div>
            <div v-else class="text-center p-8 text-gray-500">Корзина пуста</div>
            
            <div v-if="cardStorage.goods.value.length > 0" class="bg-white dark:bg-dark-card rounded-xl p-5 mt-4 shadow-sm border border-transparent dark:border-white/5">
                <div class="flex w-full justify-between items-end">
                    <div class="text-base text-gray-500 dark:text-gray-400">Итого:</div>
                    <div class="text-2xl font-bold text-light-text-main dark:text-dark-text-main leading-none">{{ getPrice(cardStorage.totalCost)}}</div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { CardStorage } from '@/storages/storage';
import BasketCard from './basket-card.vue';
import { getPrice } from '~/utils/getPrice'; // Ensure getPrice is imported
const cardStorage = CardStorage.getInstance();
</script>