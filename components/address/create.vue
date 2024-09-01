<template>
    <n-form
        @submit="onSubmit"
        class="flex rounded-lg p-4 bg-white flex-col gap-3"
    >
        <!-- Title -->
        <div class="text-2xl font-bold">Адрес доставки</div>

        <!-- Form Items -->
        <n-form-item label="Имя" path="name">
            <n-input name="name" placeholder="Имя" />
        </n-form-item>

        <n-form-item label="Фамилия" path="surname">
            <n-input name="surname" placeholder="Фамилия" />
        </n-form-item>

        <n-form-item label="Адрес" path="address">
            <n-input name="address" placeholder="Адрес" />
        </n-form-item>

        <div class="flex flex-col lg:flex-row gap-3">
            <n-form-item label="Дом" path="house">
                <n-input name="house" placeholder="Дом" />
            </n-form-item>
            <n-form-item label="Квартира" path="flat">
                <n-input name="flat" placeholder="Квартира" />
            </n-form-item>
        </div>

        <div class="flex flex-col lg:flex-row gap-3">
            <n-form-item label="Почтовый индекс" path="mail_index">
                <n-input name="mail_index" placeholder="Почтовый индекс" />
            </n-form-item>
            <n-form-item label="Страна" path="country">
                <n-input name="country" placeholder="Страна" />
            </n-form-item>
            <n-form-item label="Город" path="city">
                <n-input name="city" placeholder="Город" />
            </n-form-item>
        </div>

        <div class="flex flex-col lg:flex-row gap-3">
            <n-form-item label="Email" path="email">
                <n-input name="email" placeholder="Email" />
            </n-form-item>
            <n-form-item label="Телефон" path="phone">
                <n-input name="phone" placeholder="Телефон" />
            </n-form-item>
        </div>
        <n-form-item>
            <n-button
                class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
                type="submit"
            >
                Сохранить
            </n-button>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NButton, NInput } from "naive-ui";
const onSubmit = (event: Event) => {
    event.preventDefault();
    сonsol;
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
