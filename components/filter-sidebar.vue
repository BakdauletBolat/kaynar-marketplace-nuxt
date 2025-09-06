<template>
    <div class="filter-sidebar">
      <!-- 
        Вся верстка кнопок удалена отсюда.
        Компонент теперь просто отображает форму и передает ее события наверх.
      -->
      <n-card class="hidden lg:block h-[600px] overflow-y-scroll" title="Фильтры">
        <filter-form @submit="$emit('submit')" @clear="$emit('clear')" />
      </n-card>
      
      <div class="lg:hidden">
        <filter-form @submit="$emit('submit')" @clear="$emit('clear')" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { NCard } from 'naive-ui';
  import FilterForm from './filter-form.vue';
  
  // Просто объявляем события, которые компонент будет передавать дальше
  defineEmits(['submit', 'clear']);
  </script>
  
  <style scoped>
  .filter-sidebar {
    @apply flex flex-col h-full;
  }
  </style>