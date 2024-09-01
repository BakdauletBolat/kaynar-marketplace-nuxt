<script lang="ts" setup>
import {useManufacturerStore} from '@/storages/manufacturer-store';

const manufacturerStore = useManufacturerStore();

onMounted(()=>{
  manufacturerStore.loadManufacturers()
})

</script>
<template>
<div :style="{
  columns: '250px',
}">
  <div class="mb-4" v-for="(manufacturers, key) in manufacturerStore.manufacturersByLetterGrouping">
    <h2 class="text-lg font-bold">{{key}}</h2>
    <div class="flex flex-col gap-1 mt-2">
      <div v-for="manufacturer in manufacturers">
        <nuxt-link :to="{
        name: 'catalog-manufacturerId',
        params: {
          manufacturerId: manufacturer.id
        }
      }" class="text-sm hover:text-primary-hover hover:underline">{{manufacturer.name}}</nuxt-link>
      </div>
    </div>
  </div>
</div>
</template>
<style></style>