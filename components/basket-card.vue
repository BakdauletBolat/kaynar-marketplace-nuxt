<template>
    <div class="relative flex gap-4 p-3 bg-white dark:bg-dark-card rounded-xl border border-transparent dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-200">
        <!-- Image -->
        <div class="shrink-0 w-24 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5">
            <img class="w-full h-full object-cover"
                :src="item.picture_url ?? 'https://demofree.sirv.com/nope-not-here.jpg'"
                alt="">
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-grow min-w-0 justify-between py-1">
            <div class="pr-8">
                <div class="text-xs text-gray-500 mb-1">Kaynar Avto</div>
                <NuxtLink :to="{ name: 'product-id', params: { id: item.id } }" 
                    class="text-sm font-medium text-light-text-main dark:text-dark-text-main line-clamp-2 leading-snug hover:text-primary transition-colors">
                    {{ item.name }}
                </NuxtLink>
                <div class="mt-1 text-xs text-gray-400">Артикул: {{ item.id }}</div>
            </div>
            
            <div class="flex items-end justify-between mt-3">
                <!-- Price -->
                <div class="flex flex-col">
                    <span class="text-lg font-bold text-light-text-main dark:text-dark-text-main leading-none">{{ getPrice(item.price) }}</span>
                    <span class="text-xs text-gray-400 line-through mt-0.5">{{ getPrice(item.price * 1.2) }}</span>
                </div>

                <!-- Controls -->
                <div class="flex items-center gap-3">
                    <div class="flex items-center bg-gray-100 dark:bg-white/10 rounded-lg h-9">
                        <button 
                            @click="cardStorage.decreaseGood(item.id)" 
                            class="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <RemoveIcon class="w-4 h-4" />
                        </button>
                        
                        <div class="w-8 text-center text-sm font-medium text-light-text-main dark:text-dark-text-main">{{ item.quantity }}</div>
                        
                        <button 
                            @click="cardStorage.increaseGood(item.id)" 
                            class="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <AddIcon class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Remove Button -->
             <button 
                @click="cardStorage.removeGood(item.id)"
                class="absolute top-3 right-3 text-gray-400 hover:text-wb-red transition-colors"
                title="Удалить"
            >
                <TrashIcon class="w-5 h-5" />
             </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Add as AddIcon, Remove as RemoveIcon, Trash as TrashIcon} from '@vicons/ionicons5';
import {CardStorage} from '@/storages/storage';
import { getPrice } from '~/utils/getPrice';

const cardStorage = CardStorage.getInstance();
defineProps(['item']);
</script>