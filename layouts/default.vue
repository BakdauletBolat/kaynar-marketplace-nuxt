<script setup lang="ts">
import { isOpenCart, isOpenSidebar } from "~/storages/storage";
import UserCard from "~/components/user-card.vue";
import AppHeader from "~/components/header.vue";
import AppFooter from "~/components/footer.vue";
import { NDrawer, NDrawerContent, NButton, NDivider } from "naive-ui";
import {
    Search,
    PersonOutline,
    HeartOutline,
    BagOutline,
} from "@vicons/ionicons5";
const widthRef = ref(0);
const router = useRouter();

const isMobile = computed<boolean>(() => {
    return widthRef.value <= 500;
});

function navigateToOrder() {
    isOpenCart.value = false;
    router.push({
        name: "order-create",
    });
}

onMounted(() => {
    widthRef.value = window.innerWidth;
    function reportWindowSize() {
        widthRef.value = window.innerWidth;
    }
    window.onresize = reportWindowSize;
});
</script>

<template>
    <n-drawer :width="isMobile ? '80%' : '400px'" v-model:show="isOpenCart">
        <n-drawer-content title="Ваша корзина" closable>
            <user-card></user-card>
            <n-button
                size="large"
                round
                class="w-full"
                @click="navigateToOrder"
                type="primary"
                >Оформить заказ</n-button
            >
        </n-drawer-content>
    </n-drawer>
    <n-drawer :width="isMobile ? '80%' : '400px'" v-model:show="isOpenSidebar">
        <n-drawer-content title="Меню" closable>
            <div>
                <div class="mb-4">
                    <ul class="flex gap-2 flex-col text-xs cursor-pointer">
                        <li class="hover:underline">Доставка</li>
                        <li class="hover:underline">Возврат</li>
                        <li class="hover:underline">Оплата</li>
                        <li class="hover:underline">Контакты</li>
                        <li class="hover:underline">Продавайте</li>
                    </ul>
                </div>
                <n-divider></n-divider>
                <div class="flex flex-col gap-2">
                    <nuxt-link
                        @click="() => (isOpenSidebar = false)"
                        :to="{
                            name: 'auth-profile',
                        }"
                        class="cursor-pointer flex gap-2"
                    >
                        <PersonOutline
                            class="w-6 text-black h-6"
                        ></PersonOutline>
                        <div>Профиль</div>
                    </nuxt-link>
                    <nuxt-link
                        @click="() => (isOpenSidebar = false)"
                        :to="{
                            name: 'auth-favorites',
                        }"
                        class="cursor-pointer flex gap-2"
                    >
                        <HeartOutline class="w-6 text-black h-6"></HeartOutline>
                        <div>Избранные</div>
                    </nuxt-link>
                </div>
            </div>
        </n-drawer-content>
    </n-drawer>
    <div class="relative min-h-full">
        <app-header></app-header>
        <div>
            <slot></slot>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<style scoped></style>
