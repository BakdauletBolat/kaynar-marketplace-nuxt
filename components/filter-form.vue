<template>
    <div>
      <n-drawer :z-index="10000" v-model:show="filterStore.brandDrawerOpen" width="100%">
        <n-drawer-content title="Поиск бренда" closable>
          <brand></brand>
        </n-drawer-content>
      </n-drawer>
      <n-drawer :z-index="10001" v-model:show="filterStore.modelDrawerOpen" width="100%">
        <n-drawer-content title="Поиск модели" closable>
          <model></model>
        </n-drawer-content>
      </n-drawer>
    </div>
    <n-form :model="filterStore.filterValues" class="relative" ref="formRef">
      <n-button @click="filterStore.openBrandDrawer" size="large" class="w-full">
        Добавить марку
        <template #icon>
          <n-icon>
            <PlusIcon />
          </n-icon>
        </template>
      </n-button>
        <div class="mt-4" v-for="fields in filterStore.filtersForm">
            <n-form-item :label="fields.title" :path="fields.key">
                <n-select
                    v-if="fields.type == 'select'"
                    multiple
                    placeholder="Выберите один из вариантов"
                    v-model:value="filterStore.filterValues[fields.key]"
                    :options="fields.options"
                >
                </n-select>
                <n-radio-group
                    class="grid grid-cols-2 gap-1"
                    v-else-if="fields.type == 'radio'"
                    v-model:value="filterStore.filterValues[fields.key]"
                    :name="fields.key"
                >
                    <n-radio
                        v-for="option in fields.options"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                    />
                </n-radio-group>
            </n-form-item>
        </div>
    </n-form>
</template>
<script setup lang="ts">
import { useFilterStore } from "@/storages/filter-store";
import { onMounted, ref } from "vue";
import {NButton, NDrawer, NDrawerContent, type SelectOption, type TreeSelectOption} from "naive-ui";
import {
    NSelect,
    NRadio,
    NForm,
    NFormItem,
    NRadioGroup,
} from "naive-ui";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useManufacturerStore } from "~/storages/manufacturer-store";
import {useCarModelsStore} from "~/storages/car-models-store";
import Brand from "~/pages/search/brand.vue";
import Model from "~/pages/search/model.vue";

const modelCarStore = useCarModelsStore();
const filterStore = useFilterStore();
const manufacturerStore = useManufacturerStore();



const formRef = ref();
const brandOpen = ref(false);

const router = useRouter();

function handleUpdateValue(
    value: string | number | Array<string | number> | null,
    _: TreeSelectOption | null | Array<TreeSelectOption | null>,
) {
    //@ts-ignore
    filterStore.filterValues.category = value
        .filter((item) => !Number.isNaN(item))
}

function navigatePickManufacturer() {
  router.push({
    name: 'search-brand'
  });
}


onMounted(async () => {
  await filterStore.loadFilters();
   await manufacturerStore.loadManufacturers();
});

function trimModelCar(value: string): SelectOption {
  return {
    label: modelCarStore.getModelCarById(value)?.label,
    value
  }
}
</script>
