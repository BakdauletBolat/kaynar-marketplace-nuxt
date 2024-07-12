<template>
    <NuxtLink :to="{
                        name: 'product-id',
                        params: {
                            id: item.id
                        }
                    }" class="flex bg-white rounded-lg lg:flex-row border border-white
                      hover:shadow transition cursor-pointer
                     flex-col p-3 lg:p-5 gap-3 hover:border-slate-200">
        <div>
            <img class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"
                :src="item.pictures.length != 0 ? item.pictures[0].image : 'https://demofree.sirv.com/nope-not-here.jpg'"
                alt="">
        </div>
        <div class="w-full">
            <div class="flex justify-between flex-col w-full">
                <h2>
                    {{ item.name }}
                </h2>
                <span class="text-2xl">{{ item.price }} ₸</span>
            </div>
            <p class="text-sm mt-2">б/у {{ item.modification.modelCar.name }}</p>
            <p class="text-sm text-blue-600 font-light mt-2 hover:underline-offset-1 hover:underline">{{item.category}}</p>
            <ul class="flex flex-col md:gap-3 md:flex-row">
                <li class="text-sm text-slate-500 font-light">{{ item.warehouse ?? 'Шымкент' }}</li>
                <li class="text-sm text-slate-500 font-light">{{ formatted }}</li>
            </ul>
        </div>

    </NuxtLink>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import type {Product} from "~/api/products";
const props = defineProps<{
  item: Product
}>();
const formatted = useDateFormat(props.item.created_at, 'MMMM DD', { locales: 'ru-RU' });
</script>