<template>
    <div class="flex flex-col gap-1 w-full">
        <label :for="placeholder" class="text-nowrap">{{ placeholder }}</label>
        <input :class="{
            'border-red-400': errorMessage
        }" :id="placeholder" class="px-3 py-1.5 border rounded-sm w-full" v-model="value" />  
        <div class="text-sm text-red-400">{{ errorMessage }}</div>  
    </div>
</template>
<script setup lang="ts">
import {useField} from 'vee-validate';
const props = defineProps(['placeholder', 'name']);

const {value, errorMessage} = useField(()=>props.name);

</script>