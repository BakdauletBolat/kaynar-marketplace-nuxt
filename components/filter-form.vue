<template>
    <n-form :model="filterStore.filterValues" class="relative" ref="formRef">
        <div>
            <n-form-item label="Искать по производителю" path="manufacturer">
                <n-select
                    placeholder="Выберите варианты"
                    filterable
                    :options="manufacturerStore.manufacturerOptions"
                    v-model:value="filterStore.filterValues.manufacturer"
                    @update:value="handleOnChangeManufacturer"
                />
            </n-form-item>
        </div>
        <div>
          <n-form-item label="Искать по модели" path="modelCar">
            <n-select
                placeholder="Выберите варианты"
                filterable
                multiple
                :fallback-option="trimModelCar"
                :options="modelCarStore.modelCarOptions"
                v-model:value="filterStore.filterValues.modelCar"
            />
          </n-form-item>
        </div>
        <div>
            <n-form-item label="Искать по категории" path="category">
                <n-tree-select
                    placeholder="Выберите варианты"
                    multiple
                    cascade
                    filterable
                    checkable
                    :check-strategy="'all'"
                    :options="categoryStore.categoriesTreeOptions"
                    :value="
                        filterStore.filterValues.category.length > 0
                            ? filterStore.filterValues.category.map((item)=>parseInt(item))
                            : []
                    "
                    @update:value="handleUpdateValue"
                />
            </n-form-item>
        </div>
        <div v-for="fields in filterStore.filtersForm">
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
import type {SelectOption, TreeSelectOption} from "naive-ui";
import {
    NSelect,
    NRadio,
    NForm,
    NFormItem,
    NTreeSelect,
    NRadioGroup,
} from "naive-ui";
import { useCategoryStore } from "~/storages/category-storage";
import { useManufacturerStore } from "~/storages/manufacturer-store";
import {useCarModelsStore} from "~/storages/car-models-store";

const modelCarStore = useCarModelsStore();
const filterStore = useFilterStore();
const categoryStore = useCategoryStore();
const manufacturerStore = useManufacturerStore();


const formRef = ref();

function handleUpdateValue(
    value: string | number | Array<string | number> | null,
    _: TreeSelectOption | null | Array<TreeSelectOption | null>,
) {
    //@ts-ignore
    filterStore.filterValues.category = value
        .filter((item) => !Number.isNaN(item))
}

function handleOnChangeManufacturer(
    value: number | null) {
  modelCarStore.loadCarModelsByManufacturer(value);
}

onMounted(async () => {
  await filterStore.loadFilters();
    await categoryStore.loadCategoriesTree();
   await manufacturerStore.loadManufacturers();
});

function trimModelCar(value: string): SelectOption {
  return {
    label: modelCarStore.getModelCarById(value)?.label,
    value
  }
}
</script>
