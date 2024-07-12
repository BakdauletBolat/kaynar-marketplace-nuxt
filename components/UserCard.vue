<template>
        <div class="w-full">
            <div class="grid grid-cols-1 gap-5" v-if="cardStorage.goods.value.length > 0">
                <BasketCard   v-for="item in cardStorage.goods.value" :key="item.name"
                :item="item"></BasketCard>
            </div>
            <div v-else class="text-center p-2">Пока что пусто</div>
            <div class="border-t bg-white w-full py-5 mt-5 text-lg font-medium">
                <div class="flex w-full justify-between">
                    <div>Общая стоимость</div>
                    <div>{{ cardStorage.totalCost }} ₸</div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { CardStorage } from '@/storages/storage';
import BasketCard from './BasketCard.vue';
const cardStorage = CardStorage.getInstance();
</script>