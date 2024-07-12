<template>
    <div class="flex bg-white rounded-lg lg:flex-row flex-col p-2 lg:p-5 gap-3 hover:border-slate-400">
        <div>
            <img class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"
                :src="item.pictures.length != 0 ? item.pictures[0].image : 'https://demofree.sirv.com/nope-not-here.jpg'"
                alt="">
        </div>
        <div class="w-full">
            <div class="flex justify-between flex-col md:flex-row w-full">
                <h2 >
                    <NuxtLink class="text-lg font-medium text-blue-500 hover:underline-offset-1 hover:underline" :to="{
                        name: 'product-id',
                        params: {
                            id: item.id
                        }
                    }">{{ item.name }}</NuxtLink>
                </h2>
                <span>{{ item.price }} ₸</span>
            </div>
            <p class="text-sm mt-3 ">б/у {{ item.modification.modelCar.name }}</p>
            <p class="text-sm text-slate-500 font-light max-w-[400px]">Продаю раму на Прадо 78.5 дверный. В отличном
                состоянии с
                документами</p>
            <ul class="flex flex-col md:gap-3 md:flex-row mt-3">
                <li class="text-sm text-slate-400 font-light">{{ item.warehouse ?? 'Шымкент' }}</li>
                <li class="text-sm text-slate-400 font-light">{{ formatted }}</li>
            </ul>


        </div>

    </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
const props = defineProps(['item']);
const formatted = useDateFormat(props.item.created_at, 'MMMM DD');
</script>