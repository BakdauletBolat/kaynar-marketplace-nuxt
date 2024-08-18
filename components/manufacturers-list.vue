<script lang="ts" setup>
import {useManufacturerStore} from '@/storages/manufacturer-store';

const manufacturerStore = useManufacturerStore();

onMounted(()=>{
  manufacturerStore.loadManufacturers()
})

</script>
<template>
<div class="grid lg:grid-rows-3 md:grid-rows-6 grid-rows-12 gap-4 grid-flow-col items-start">
  <div v-for="(manufacturers, key) in manufacturerStore.manufacturersByLetterGrouping">
    <h2 class="text-lg font-bold">{{key}}</h2>
    <div class="flex flex-col gap-1 mt-2">
      <div v-for="manufacturer in manufacturers">
        <nuxt-link :to="{
        name: 'index'
      }" class="text-sm hover:text-blue-400 hover:font-medium hover:underline">{{manufacturer.name}}</nuxt-link>
      </div>
    </div>
  </div>
</div>
</template>
<style></style>