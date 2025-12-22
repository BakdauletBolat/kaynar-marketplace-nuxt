<template>
    <div class="space-y-8">
        <!-- Section: Personal Info -->
        <section>
            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Данные получателя</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <custom-n-input
                    :defaultValue="orderStore.userInfo.phone_number"
                    name="phone_number"
                    placeholder="Телефон"
                ></custom-n-input>
                <custom-n-input
                    :defaultValue="orderStore.userInfo.email"
                    name="email"
                    placeholder="Email (необязательно)"
                ></custom-n-input>
            </div>
        </section>

        <!-- Section: Delivery Address -->
        <section>
            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Адрес доставки</h4>
            <div class="space-y-4">
                <custom-n-input name="address" placeholder="Город, улица, дом"></custom-n-input>
                <div class="grid grid-cols-3 gap-4">
                    <custom-n-input
                        name="building"
                        placeholder="Подъезд"
                    ></custom-n-input>
                    <custom-n-input
                        name="apartment"
                        placeholder="Квартира"
                    ></custom-n-input>
                    <custom-n-input
                        name="postal_code"
                        placeholder="Индекс"
                    ></custom-n-input>
                </div>
            </div>
        </section>

        <!-- Payment Method Placeholder (WB style) -->
        <section>
            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Способ оплаты</h4>
            <div class="p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
               <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-white dark:bg-dark-card rounded-lg flex items-center justify-center shadow-sm">
                     💳
                  </div>
                  <div>
                     <div class="text-sm font-bold text-light-text-main dark:text-dark-text-main">Картой при получении</div>
                     <div class="text-xs text-gray-500">Оплата после проверки товара</div>
                  </div>
               </div>
               <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-white"></div>
               </div>
            </div>
        </section>

        <!-- Submit Button -->
        <div class="pt-6">
            <n-button
                @click="onSubmit"
                :loading="orderStore.isLoadingAddressCreate || orderStore.isOrderCreateLoading"
                type="primary"
                size="large"
                class="w-full !h-14 !rounded-xl !text-lg !font-bold shadow-xl shadow-purple-500/20"
            >
                Подтвердить заказ
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useOrderStore } from "~/storages/order-store";
import { useAuthStore } from "~/storages/auth-store";
import { useMessage, NButton } from "naive-ui";
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

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        first_name: yup.string().required("Имя обязательно"),
        last_name: yup.string().required("Фамилия обязательно"),
        address: yup.string().required("Адрес обязателен"),
        apartment: yup.string(),
        building: yup.string(),
        postal_code: yup.string(),
        email: yup.string().email("Некорректный email"),
        phone_number: yup.string().required("Телефон обязателен"),
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
        // The parent component handles the success state via orderStore.order
        message.success("Заказ успешно оформлен!");
    } catch (e: any) {
        message.error("Ошибка при оформлении заказа");
        console.error(e);
    }
});
</script>
