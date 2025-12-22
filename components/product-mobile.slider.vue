<template>
    <div class="relative">
        <div v-if="pictures.length > 0" class="w-full flex flex-col gap-3">
        <div class="w-full relative">
            <Flicking @changed="onChange" class="rounded" ref="flicking" :options="{
                preventClickOnDrag: true,
                duration: 100
            }">
                    <div :key="picture.id" v-for="picture in pictures" class="pointer-events-none object-cover panel h-[300px] w-full" >
                      <n-image object-fit="cover" class="object-cover h-full w-full" width="100%" :src="picture.image" />
                    </div>
            </Flicking>
            <div class="flex absolute bottom-0 z-20 left-1/2 -translate-x-1/2 justify-center items-center py-3 gap-1">
                <div v-for="(_, index) in pictures.length" :class="{
                '!bg-primary w-3 h-3': index == currentValue
            }" class="w-2 h-2 rounded-full bg-slate-100" ></div>
            </div>
        </div>
    </div>
    <div v-else>
        Нету фотографий
    </div>
    </div>
    
</template>
<script setup lang="ts">
import Flicking from "@egjs/vue3-flicking";
import { ref, watchEffect } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline";
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

const props = withDefaults(defineProps<{
    pictures?: Picture[]
}>(), {
    pictures: () => []
});

function next() {
    
    if (currentValue.value >= (props.pictures?.length ?? 0) - 1) {
        return;
    }
    currentValue.value += 1;
}

function prev() {
    console.log(currentValue.value, props.pictures?.length)
    if (currentValue.value <= 0) {
        return;
    }
    currentValue.value -= 1;
}



</script>