<script setup lang="ts">

defineProps<{
  searchText: string
}>()

</script>

<template>
  <div>
    <span class="text-lg">По запросу <span class="font-bold">{{searchText}}</span> мы ничего не нашли</span>
    <div class="text-neutral-600 italic mt-4">
      <span>Рекомендации:</span>
      <ul>
        <li>- Убедитесь что в тексте нет ошибок</li>
        <li>- Попробуйте сократить запрос</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>