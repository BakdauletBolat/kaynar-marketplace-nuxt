<template>
    <button :disabled="isLoading" @click="$emit('click')" class="mt-3 justify-center gap-3 items-center bg-primary p-3 flex text-center cursor-pointer rounded-sm" :class="{
        '!bg-gray-400 text-white': isLoading
    }">
    <span>{{ isLoading ? 'Загрузка' : name }}</span>
    <div v-if="isLoading" class="border-gray-300 h-7 w-7 animate-spin rounded-full border-2 border-t-primary"></div>
  </button>
</template>
<script setup lang="ts">
defineEmits(['click']);
defineProps(['name', 'isLoading']);
</script>