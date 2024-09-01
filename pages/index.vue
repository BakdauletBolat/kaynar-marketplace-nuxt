<script setup lang="ts">
import SearchBlock from "~/components/search-block.vue";
import Card from "~/components/card.vue";
import { useProductStore } from "@/storages/product-store";
import ManufacturersList from "~/components/manufacturers-list.vue";
import CategoriesList from "~/components/categories-list.vue";

const productStore = useProductStore();

onMounted(() => {
    productStore.loadPopularProducts({});
});
</script>

<template>
    <main>
        <section
            :style="{
                backgroundSize: 'cover',
                background: `url('https://kartinki.pics/uploads/posts/2021-07/1626725529_6-kartinkin-com-p-zapchasti-fon-krasivo-7.jpg') no-repeat center`,
            }"
        >
            <div class="mx-auto container px-4">
                <search-block></search-block>
            </div>
        </section>
        <section class="mx-auto container px-4">
            <h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">
                Лучшие предложение
            </h3>
            <div
                v-if="productStore.popularProducts"
                class="grid gap-2 md:grid-cols-2 md:gap-3 mt-3"
            >
                <card
                    :item="item"
                    v-for="item in productStore.popularProducts"
                ></card>
            </div>
            <div v-else>
                <!-- {{ error }} -->
            </div>
        </section>
        <section class="mx-auto container px-4">
            <h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">Поиск по марке</h3>
            <div class="mt-4">
                <manufacturers-list></manufacturers-list>
            </div>
        </section>
        <section class="mx-auto container px-4">
            <h3 class="mt-9 px-3 md:px-0 text-2xl font-bold">
                Поиск по категории
            </h3>
            <div class="mt-4">
                <!--        <categories-list></categories-list>-->
            </div>
        </section>
    </main>
</template>

<style scoped></style>
