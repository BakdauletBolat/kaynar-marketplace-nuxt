<template>
    <article class="flex bg-white rounded lg:flex-row border border-slate-200
                      hover:shadow transition cursor-pointer
                     flex-col p-3 lg:p-5 gap-3 hover:border-slate-200">
        <div>
            <nuxt-link class="w-full" :to="{
                params: {
                    id: item.id
                },
                name: 'product-id'
            }">
              <n-carousel class="lg:w-[160px]" :space-between="20" draggable>
                <img loading="lazy" v-for="picture in item.pictures"
                     class="rounded border lg:h-[120px] h-[200px] object-cover w-full"
                     :alt="picture.product.toString()"
                     :src="picture.image"/>
              </n-carousel>

            </nuxt-link>
        </div>
        <div class="w-full">
            <div class="flex justify-between flex-col w-full">
                <div class="w-full flex items-center justify-between">
                    <nuxt-link class="text-blue-900" :to="{
                        name: 'product-id',
                        params: {
                            id: item.id
                        }
                    }">
                        {{ getPrice(item.price) }}
                    </nuxt-link>
                    <div class="flex justify-center items-center" @click="handleFavorite">
                        <n-icon size="24" color="red"
                            :component="favoritesStore.checkInFavorites(item.id) ? Heart : HeartOutline" />
                    </div>
                </div>
                <nuxt-link :to="{
                    name: 'product-id',
                    params: {
                        id: item.id
                    }
                }">
                    <span class="text-2xl">{{ item.name ?? 'Навзание' }}</span>
                </nuxt-link>
            </div>
            <p class="text-sm mt-2">{{ item.modelCar.manufacturer.name }}, {{ item.modelCar.name }}</p>
            <ul class="flex flex-col md:gap-3 md:flex-row">
                <li class="text-sm text-slate-500 font-light">{{ item.warehouse?.city?.name ?? 'Шымкент' }}</li>
                <li class="text-sm text-slate-500 font-light">{{ formatted }}</li>
            </ul>
        </div>
    </article>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import type { ProductList } from "~/api/products";
import { useFavoritesStore } from "~/storages/favorites-store";
import { Heart, HeartOutline } from "@vicons/ionicons5";
import { getPrice } from '~/utils/getPrice';
import {NCarousel} from "naive-ui";
const favoritesStore = useFavoritesStore();
const message = useMessage();
const props = defineProps<{
    item: ProductList
}>();

function handleFavorite() {
    const action = favoritesStore.addToFavorite(props.item);
    if (action == 'removed') {
        message.warning("Убран из избранных")
        return;
    }
    message.success("Добавлен в избранные")
}

const formatted = useDateFormat(props.item.created_at, 'MMMM DD', { locales: 'ru-RU' });
</script>