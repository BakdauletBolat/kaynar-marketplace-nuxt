<script setup lang="ts">
import SearchBlock from "@/components/SearchBlock.vue";
import Card from '@/components/Card.vue';
import {getProducts} from "~/api/products";


const { data, error } = await useAsyncData('products', () => getProducts( {}))


</script>

<template>

  <main>
    <section
        :style="{
          backgroundSize: 'cover',
          background: `url('https://kartinki.pics/uploads/posts/2021-07/1626725529_6-kartinkin-com-p-zapchasti-fon-krasivo-7.jpg') no-repeat center`
            }">
      <div
          class="mx-auto max-w-7xl px-4 lg:px-6">
        <SearchBlock></SearchBlock>
      </div>
    </section>
    <section class="mx-auto max-w-7xl px-4 lg:px-6">
      <h3 class="mt-9 px-3 md:px-0 text-lg font-bold">Лучшие предложение</h3>
      <div v-if="data?.results"  class="grid gap-1 md:px-0 md:grid-cols-2 md:gap-3 mt-3">
        <Card :item="item" v-for="item in data.results"></Card>
      </div>
      <div v-else>
        {{error}}
      </div>
    </section>
  </main>
</template>

<style scoped></style>
