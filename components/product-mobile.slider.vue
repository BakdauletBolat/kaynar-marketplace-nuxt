<template>
    <div v-if="pictures.length > 0" class="w-full flex flex-col gap-3">
        <div class="w-full relative">
            <Flicking @changed="onChange" class="rounded-sm" ref="flicking" :options="{
                preventClickOnDrag: true,
                duration: 100
            }">
                    <div :key="picture.id" v-for="picture in pictures" class="pointer-events-none panel h-[300px] w-full" >
                      <n-image class="object-cover" width="100%" height="100%" :src="picture.image" />
                    </div>
            </Flicking>
            <div>
                <ChevronLeftIcon @click="prev" class="absolute z-10 -translate-y-1/2 top-1/2 cursor-pointer w-7 h-7"></ChevronLeftIcon>
                <ChevronRightIcon  @click="next" class="absolute z-10 -translate-y-1/2 top-1/2 right-0 w-7 h-7 cursor-pointer"></ChevronRightIcon>
            </div>
            <div class="flex justify-center items-center py-3 gap-1">
                <div v-for="(_, index) in pictures.length" :class="{
                '!bg-primary w-3 h-3': index == currentValue
            }" class="w-2 h-2 rounded-full bg-slate-100" ></div>
            </div>
        </div>
    </div>
    <div v-else>
        Нету фотографий
    </div>
</template>
<script setup lang="ts">
import Flicking from "@egjs/vue3-flicking";
import { ref, watchEffect } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import {NImage} from 'naive-ui';
import { type Picture } from "@/api/products";

type ChangedValue = {
    index: number;
}

const currentValue = ref(0);

function onChange(changed: ChangedValue) {
    currentValue.value = changed.index;
}

const flicking = ref<Flicking | null>(null);

watchEffect(() => {
    if (flicking.value != null) {
        try {
            flicking.value!.moveTo(currentValue.value);
        }   
        catch (e) {

        }
       
    }
});

const props = defineProps<{
    pictures: Picture[]
}>();

function next() {
    
    if (currentValue.value >= props.pictures.length - 1) {
        return;
    }
    currentValue.value += 1;
}

function prev() {
    console.log(currentValue.value, props.pictures.length)
    if (currentValue.value <= 0) {
        return;
    }
    currentValue.value -= 1;
}



</script>