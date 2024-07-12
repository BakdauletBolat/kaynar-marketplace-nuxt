<script setup lang="ts">
import {ArrowRightIcon} from "@heroicons/vue/24/outline";

defineProps(['options']);
</script>

<template>
<ul class="flex gap-2 text-slate-700 flex-wrap text-xs">
  <li v-for="(option, index) in options" class="flex items-center gap-2" :key="option.text">
    <NuxtLink :to="option.link" v-if="option.link">
      {{option.text}}
    </NuxtLink>
    <div>{{option.text}}</div>
    <span v-if="index < options.length - 1" class="dot"><ArrowRightIcon class="w-2 h-2"></ArrowRightIcon></span>
  </li>
</ul>
</template>

<style scoped>

</style>