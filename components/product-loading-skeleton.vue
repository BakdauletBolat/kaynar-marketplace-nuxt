<script setup lang="ts">
import {NSkeleton} from 'naive-ui';
</script>

<template>
  <div class="flex gap-3">
    <n-skeleton :width="129" :height="120"></n-skeleton>
    <div class="flex flex-col gap-2">
      <n-skeleton :width="200" :height="20"></n-skeleton>
      <n-skeleton :width="50" :height="30"></n-skeleton>
      <n-skeleton :width="220" :height="15"></n-skeleton>
      <n-skeleton :width="200" :height="15"></n-skeleton>
      <div class="flex gap-2">
        <n-skeleton :repeat="2" width="200" text></n-skeleton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>