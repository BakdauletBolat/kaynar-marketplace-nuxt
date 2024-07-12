<template>
    <div @click="removeMessage(error.uuid)" class="cursor-pointer max-w-7xl border bg-red-400 p-3 mx-auto text-white flex text-sm justify-between items-center gap-3" v-for="error in errors">
        <div>{{ error.message }}</div>
        <XMarkIcon class="w-5 h-5"></XMarkIcon>
    </div>
</template>
<script setup lang="ts">
import {errors, removeMessage} from './storage';
import { XMarkIcon } from '@heroicons/vue/24/outline'
</script>