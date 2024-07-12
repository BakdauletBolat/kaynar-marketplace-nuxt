<template>
    <div ref="target" class="relative flex justify-between items-center p-2 rounded-lg border">
        <div class="flex flex-wrap w-full items-center gap-1">
            <div v-if="open || model!.length <= 1" class="p-1 rounded-lg flex gap-1 items-center justify-center"
                :key="option.id" v-for="option in model">
                <span class="text-sm text-slate-500">{{ option.name }}</span>
                <XMarkIcon @click="update(option)" class="w-5 h-5 cursor-pointer"></XMarkIcon>
            </div>
            <div @click="open = true" v-if="!open && model!.length > 1"
                class="py-1 px-2 cursor-pointer hover:border-slate-700 border text-sm text-slate-500 rounded-sm flex gap-1 items-center justify-center">
                {{ model![0].name }} и еще {{ model!.length - 1 }}
            </div>
            <input :disabled="disabled" @keyup.delete="handleDeleteChange" v-if="open || model!.length <= 1" v-model="query" @focus="open = true" :class="{
                'w-full': model!.length <= 0
            }" class="max-w-full text-sm focus:outline-none p-2" :placeholder="placeholder" />
        </div>
        <div>
            <ChevronUpDownIcon @click="open = !open" class="w-6 h-6 cursor-pointer"></ChevronUpDownIcon>
        </div>
        <div v-if="open"
            class="h-[250px] top-full left-0 rounded-lg w-full shadow-md bg-white z-10 absolute overflow-scroll flex flex-col">
            <div @click="update(option)" class="p-2 border-b border-b-slate-100 flex items-center gap-2 cursor-pointer  hover:bg-slate-100 "
                v-for="option in filteredOptions" :key="option.id"><CheckIcon class="h-5 w-5 text-sky-700" v-if="contains(option)"></CheckIcon> <div>{{ option.name }}</div></div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { type Option } from './index';
import { ref, computed } from 'vue';
import { XMarkIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
    options: Option[],
    disabled?: boolean,
    placeholder: string;
}>();

const model = defineModel<Option[]>();

const handleDeleteChange = (e: any) => {
    if (e.target.value === '') {
        model.value?.splice(model.length-1, 1);
    }
}

function update(item: Option) {
    const index = model.value?.findIndex(itemIn => itemIn.id == item.id);

    if (index != -1) {
        model.value?.splice(index!, 1);
    }
    else {
        model.value?.push(item);
    }
    query.value = '';
    closeDropDown();
}

function contains(item: Option) {
    const index = model.value?.findIndex(itemIn => itemIn.id == item.id);

    if (index != -1) {
        return true;
    }
    return false;
}


const filteredOptions = computed(() => {
    if (query.value === '') {
        return props.options;
    }
    return props.options.filter((item) => {
        const name = item.name.toLowerCase();
        return name.startsWith(query.value.toLowerCase());
    });
});


const query = ref<string>('');

const target = ref(null);

const closeDropDown = () => {
    open.value = false;
}

onClickOutside(target, closeDropDown)

const open = ref<boolean>(false);

</script>
  