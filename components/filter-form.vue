<template>
    <form :class="{
      'pointer-events-none opacity-50': catalogStorage.isProductLoading.value,
    }" class="lg:px-5 lg:py-2 rounded-sm lg:max-h-[100vh] lg:overflow-scroll">
              <h3 class="sr-only">Categories</h3>
              <Disclosure :defaultOpen="section.isOpen"  as="div" v-for="section in catalogStorage.filters" :key="section.id"
                class="py-3" v-slot="{ open }">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span class="font-medium text-gray-900">{{ section.name }}</span>
                    <span class="ml-6 flex items-center">
                      <ChevronDownIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                      <ChevronUpIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="mt-5">
                  <div class="grid gap-1 grid-cols-2 w-full" v-if="section.type == 'range'">
                      <input class="border text-sm rounded-sm p-2" :placeholder="section.range.labelFrom" />
                      <input class="border text-sm rounded-sm p-2" :placeholder="section.range.labelTo" />
                  </div>
                  <div v-else-if="section.type == 'array'" class="grid grid-cols-3 gap-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                        @click="catalogStorage.updateSelectedValues(section.id, option)" :value="option"
                        type="checkbox" :checked="option.checked"
                        class="h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option
                      }}</label>
                    </div>
                  </div>
                  <div v-else class="space-y-4">
              
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                        @click="catalogStorage.updateSelectedValues(section.id, option.value)" :value="option.value"
                        type="checkbox" :checked="option.checked"
                        class="h-5 w-5 rounded border-gray-300 bg-primary checked:bg-primary focus:ring-bg-primary" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label
                      }}</label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>
</template>
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue';
import { ChevronDownIcon,  ChevronUpIcon } from '@heroicons/vue/20/solid'
import { CatalogStorage } from '@/storages/storage';
import { onMounted } from 'vue';
const catalogStorage = CatalogStorage.getInstance();


// watch(catalogStorage.selectedValues.value, (value)=>{
//   catalogStorage.loadProducts(value);
// });

onMounted(()=>{
  catalogStorage.loadFilters();
});
</script>
