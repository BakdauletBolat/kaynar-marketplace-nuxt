<script setup lang="ts">
import { isOpenCart } from "~/storages/storage";
import UserCard from "~/components/user-card.vue";
import AppHeader from "~/components/header.vue";
import AppFooter from "~/components/footer.vue";
import { NDrawer, NDrawerContent, NButton } from "naive-ui";

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
    <div class="relative min-h-full bg-slate-100">
        <app-header></app-header>
        <div class="bg-slate-100">
            <slot></slot>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<style scoped></style>
