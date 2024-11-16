<template>
    <nuxt-link
        :to="{
            name: 'product-id',
            params: {
                id: item.id,
            },
        }"
        class="flex border-slate-200 bg-white rounded lg:flex-row border hover:shadow transition cursor-pointer flex-col p-3 lg:p-5 gap-3 hover:border-slate-200"
    >
        <div>
            <img
                class="rounded border lg:h-[120px] h-[200px] object-cover w-full lg:w-[160px]"
                :src="
                    item.pictures.length != 0
                        ? item.pictures[0].image
                        : 'https://demofree.sirv.com/nope-not-here.jpg'
                "
                alt=""
            />
        </div>
        <div class="w-full">
            <div class="flex justify-between flex-col w-full">
                <h2>
                    {{ item.name ?? "Навзание" }}
                </h2>
                <span class="text-2xl">{{ item.price ?? 1000 }} ₸</span>
            </div>
            <p class="text-sm mt-2">{{ item.modelCar.name }}</p>
            <p
                class="text-sm text-blue-600 font-light mt-2 hover:underline-offset-1 hover:underline"
            >
                {{ item.category.name }}
            </p>
            <ul class="flex flex-col md:gap-3 md:flex-row">
                <li class="text-sm text-slate-500 font-light">
                    {{ item.warehouse?.city?.name ?? "Шымкент" }}
                </li>
                <li class="text-sm text-slate-500 font-light">
                    {{ formatted }}
                </li>
            </ul>
        </div>
    </nuxt-link>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import type { ProductList } from "~/api/products";
const props = defineProps<{
    item: ProductList;
}>();
const formatted = useDateFormat(props.item.created_at, "MMMM DD", {
    locales: "ru-RU",
});
</script>
