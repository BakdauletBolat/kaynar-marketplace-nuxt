<template>
    <div class="grid grid-cols-[100px_1fr] gap-3 rounded-sm">
        <div class="h-[100px] block">
            <img class="rounded w-full h-full object-cover"
                :src="item.picture_url ?? 'https://demofree.sirv.com/nope-not-here.jpg'"
                alt="">
        </div>
        <div class="">
            <div class="flex flex-col justify-between w-full">
                <RouterLink :to="{
                    name: 'product-id',
                    params: {
                        id: item.id
                    }
                }" class="text-lg">{{ item.name }}</RouterLink>
                <span class=" ">{{ item.price }} ₸</span>
                <div class="flex items-center mt-3 gap-2">
                    <div><add-icon @click="cardStorage.increaseGood(item.id)" class="w-[24px] text-slate-600 cursor-pointer"></add-icon></div>
                    <div>{{ item.quantity }}</div>
                    <div><remove-icon @click="cardStorage.decreaseGood(item.id)" class="w-[24px] text-slate-600 cursor-pointer"></remove-icon></div>
                    <div><trash-icon @click="cardStorage.removeGood(item.id)" class="w-[24px] text-red-500 cursor-pointer"></trash-icon></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Add as AddIcon, Remove as RemoveIcon, Trash as TrashIcon} from '@vicons/ionicons5';
import {CardStorage} from '@/storages/storage';
const cardStorage = CardStorage.getInstance();
defineProps(['item']);
</script>../storages/storage