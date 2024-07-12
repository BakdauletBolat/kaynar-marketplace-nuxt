<template>
    <div class="bg-sky-100">
        <div class="bg-sky-200 py-6 p-3 rounded-sm">
            <ul class="flex gap-3 flex-wrap">
                <li @click="active = category.name" :key='category.id' v-for="category in catalogStorage.categories.value"><RouterLink :to="{
                    name: 'catalog',
                    query: {
                        category: category.id.toString()
                    }
                }"
                        class="text-nowrap text-[#2a81dd] underline underline-offset-4" :class="{
                            '!text-black': category.name == active
                        }">{{ category.name }}</RouterLink></li>
            </ul>
        </div>
        <div class="flex p-3 w-full lg:flex-row flex-col gap-5">
            <div class="basis-[60%]">
                <div class="flex flex-col text-sm gap-2">
                    <input id="search" type="text" class="border p-2 rounded border-slate-200" placeholder="Что ищем?">
                    <label for="search" class="text-slate-500 text-sm">Название запчасти, производитель и другие слова для
                        поиска.</label>
                </div>
                <ul class="flex mt-5 gap-3 flex-wrap">
                    <li @click="active = car" :key='car' v-for="car in cars"><a href="#"
                            class="text-nowrap text-[#2a81dd] underline underline-offset-4" :class="{
                                '!text-black': car == active
                            }">{{ car }}</a></li>

                </ul>
                <button class="bg-sky-500 text-white px-5 py-2 mt-6 rounded-sm">Показать 4033 объявлений</button>
            </div>

            <div>
                <div>
                    <label class="text-sm text-slate-500" for="">Состояние</label>
                    <div class="flex overflow-hidden rounded-sm mt-2">
                        <button class="px-6 py-2 bg-sky-400">б/у</button>
                        <button class="px-6 py-2 bg-white">новая</button>
                    </div>
                </div>
                <div class="mt-5">
                    <label class="text-sm text-slate-500" for="">Наличие</label>
                    <div class="flex overflow-hidden rounded-sm mt-2">
                        <button class="px-6 py-2 bg-sky-400">В наличии</button>
                        <button class="px-6 py-2 bg-white">На заказ</button>
                    </div>
                </div>
                <div class="mt-5">
                    <label class="text-sm text-slate-500" for="">Цена</label>
                    <div class="grid grid-cols-2 overflow-hidden rounded-sm mt-2">
                        <input class="border p-2 rounded border-slate-200" placeholder="от" />
                        <input class="border p-2 rounded border-slate-200" placeholder="до" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CatalogStorage } from '@/storages/storage';

const catalogStorage = CatalogStorage.getInstance();


const active = ref('Автозапчасти');

const cars: string[] = [
    'Toyota',
    'Nissan',
    'Lexus',
    'Mitsubishi',
    'Mercedes-Benz',
    'Hyundai'
];
</script>