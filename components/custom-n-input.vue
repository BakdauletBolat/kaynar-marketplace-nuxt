<template>
    <div class="w-full flex flex-col gap-2">
        <n-input
            :placeholder="placeholder"
            :status="errorMessage ? 'error' : 'success'"
            v-model:value="value"
            clearable
        />
        <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
    </div>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";
import { NInput } from "naive-ui";
const props = defineProps<{
    name: string;
    placeholder?: string;
    defaultValue?: string;
}>();
const { value, errorMessage } = useField(() => props.name, {
    validateOnValueUpdate: true,
});

onMounted(() => {
    if (props.defaultValue != undefined) {
        value.value = props.defaultValue;
    }
});
watch(props, (newProps, _) => {
    if (newProps.defaultValue != undefined) {
        value.value = newProps.defaultValue;
    }
});
</script>
