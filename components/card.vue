<template>
    <article class="flex bg-white rounded lg:flex-row border border-slate-200
                      hover:shadow transition cursor-pointer
                     flex-col p-3 lg:p-5 gap-3 hover:border-slate-200">
        <div>
          <n-badge class="w-full">
            <nuxt-link class="w-full" :to="{
                  name: 'product-id',
                  params: {
                      id: item.id
                  }
              }" >
              <img class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"
                   :src="item.pictures.length != 0 ? item.pictures[0].image : 'https://demofree.sirv.com/nope-not-here.jpg'"
                   alt="">
            </nuxt-link>

            <template #value>
              <div class="flex justify-center items-center" @click="handleFavorite">
                <n-icon :component="favoritesStore.checkInFavorites(item.id) ? Heart : HeartOutline" />
              </div>
            </template>
          </n-badge>
        </div>
        <div class="w-full">
            <div class="flex justify-between flex-col w-full">
                <nuxt-link :to="{
                  name: 'product-id',
                  params: {
                      id: item.id
                  }
              }" >
                  <h2>
                    {{ item.name ?? 'Навзание' }}
                  </h2>
                </nuxt-link>
                <span class="text-2xl">{{ item.price ?? 1000 }} ₸</span>
            </div>
            <p class="text-sm mt-2">{{item.modelCar.name}}</p>
            <p class="text-sm text-blue-600 font-light mt-2 hover:underline-offset-1 hover:underline">{{ item.category.name }}</p>
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
import {useFavoritesStore} from "~/storages/favorites-store";
import {NBadge} from 'naive-ui';
import {Heart, HeartOutline} from "@vicons/ionicons5";

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