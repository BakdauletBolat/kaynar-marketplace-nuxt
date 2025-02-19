<template>
    <form class="flex rounded-lg bg-white flex-col gap-3">
        <div class="flex flex-col lg:flex-row gap-3 mt-4">
            <custom-n-input
                :defaultValue="orderStore.userInfo.first_name"
                name="first_name"
                placeholder="Имя"
            ></custom-n-input>
            <custom-n-input
                :defaultValue="orderStore.userInfo.last_name"
                name="last_name"
                placeholder="Фамилия"
            ></custom-n-input>
        </div>
        <div class="flex flex-col lg:flex-row gap-3">
            <custom-n-input name="address" placeholder="Адрес"></custom-n-input>
            <div class="flex gap-3">
                <custom-n-input
                    name="building"
                    placeholder="Дом"
                ></custom-n-input>
                <custom-n-input
                    name="apartment"
                    placeholder="Квартира"
                ></custom-n-input>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-3">
            <custom-n-input
                name="postal_code"
                placeholder="Почтовый индекс"
            ></custom-n-input>
            <custom-n-input
                :defaultValue="orderStore.userInfo.email"
                name="email"
                placeholder="Email"
            ></custom-n-input>
            <custom-n-input
                :defaultValue="orderStore.userInfo.phone_number"
                name="phone_number"
                placeholder="Телефон"
            ></custom-n-input>
        </div>
        <n-button
            @click="onSubmit"
            :loading="
                orderStore.isLoadingAddressCreate ||
                orderStore.isOrderCreateLoading
            "
            class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
            >Создать заказ</n-button
        >
    </form>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useOrderStore } from "~/storages/order-store";
import { useAuthStore } from "~/storages/auth-store";
import { useMessage } from "naive-ui";
import CustomNInput from "~/components/custom-n-input.vue";
const orderStore = useOrderStore();
const authStore = useAuthStore();
const message = useMessage();

onMounted(() => {
    authStore.loadUser().then((user) => {
        if (user != undefined) {
            orderStore.updateUserInfo({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone,
            });
        }
    });
});

const { handleSubmit, meta } = useForm({
    validationSchema: yup.object({
        first_name: yup.string().required("Имя обязательно"),
        last_name: yup.string().required("Фамилия обязательно"),
        address: yup.string(),
        apartment: yup.string(),
        building: yup.string(),
        postal_code: yup.string(),
        email: yup
            .string()
            .email("Почта неправильный"),
        phone_number: yup.string().required("Телефон обязательно"),
    }),
});

const onSubmit = handleSubmit(async (values: any) => {
    try {
        orderStore.updateUserInfo({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone_number: values.phone_number,
        });
        orderStore.createAddress({
            postal_code: values.postal_code,
            apartment: values.apartment,
            building: values.building,
            address: values.address,
        });
        await orderStore.createOrder();
        orderStore.changeTab(1);
        message.success("Поздравляем с оформлением заказа!");
    } catch (e: any) {
        message.error("Что то пошло не так + " + e.toString());
    }
});
</script>
