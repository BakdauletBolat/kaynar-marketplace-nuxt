<template>
    <form class="flex rounded-lg p-4 bg-white flex-col gap-3">
        <div class="text-2xl font-bold">Адрес доставки</div>
        <div class="flex flex-col lg:flex-row gap-3">
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
    authStore.loadUser().then(() => {
        console.log(authStore.user, "user");
        orderStore.updateUserInfo({
            first_name: authStore.user.first_name,
            last_name: authStore.user.last_name,
            email: authStore.user.email,
            phone_number: authStore.user.phone,
        });
    });
});

const { handleSubmit, meta } = useForm({
    validationSchema: yup.object({
        first_name: yup.string().required("Имя обязательно"),
        last_name: yup.string().required("Фамилия обязательно"),
        address: yup.string().required("Адрес обязательно"),
        apartment: yup.string(),
        building: yup.string(),
        postal_code: yup.string().required("Почтовой индекс обязательно"),
        email: yup
            .string()
            .required("Почта обязательно")
            .email("Почта неправильный"),
        phone_number: yup.string().required("Телефон обязательно"),
    }),
});

const onSubmit = handleSubmit((values: any) => {
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
        orderStore.createOrder();
        orderStore.changeTab(1);
        message.success("Поздравляем с покупкой");
    } catch (e: any) {
        console.log(e);
        message.success("Что то пошло не так +" + e.toString());
    }
});
</script>
