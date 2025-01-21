<script setup lang="ts">
import {NPageHeader} from "naive-ui";
import {timeAgo} from "~/utils/timeAgo";

const userStore = useAuthStore();
const router = useRouter();
const message = useMessage();

const activeCancelOrder = ref<number | null>(null);
const showCancelOrderModal = computed<boolean>(()=>{
  return activeCancelOrder.value !== null;
})



onMounted(()=>{
  userStore.loadOrders();
});


function handleBack() {
  router.back();
}

function cancelOrder() {
  if (activeCancelOrder.value) {
    userStore.cancelOrder(activeCancelOrder.value).then(()=>{
      message.success('Успешно отменено заказ')
      userStore.loadOrders();
      activeCancelOrder.value = null;
    }).catch(err=>{
      message.error(err.message)
    })
  }
}

definePageMeta({
  middleware: "auth",
});

</script>

<template>
<main>
  <n-modal  v-model:show="showCancelOrderModal"

            title="Вы хотите отменить заказ?"
            content="Are you sure?"
            preset="dialog"
            positive-text="Да отменить"
            negative-text="Назад"
            @positive-click="cancelOrder"
            @negative-click="()=>activeCancelOrder = null">
  </n-modal>
  <mobile-only-component>
    <n-page-header :on-back="handleBack" class="fixed w-full z-10 top-0 bg-white px-4 py-2 shadow">
      <template #title>
      <span style="text-decoration: none; color: inherit">
        Мои заказы
      </span>
      </template>
    </n-page-header>
  </mobile-only-component>
  <desktop-only-component>
    <div class="mt-4 container px-4 mx-auto">
      <n-breadcrumb>
        <n-breadcrumb-item><nuxt-link :to="{
            name: 'index'
          }">Главная
        </nuxt-link></n-breadcrumb-item>
        <n-breadcrumb-item>
          Мои заказы
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
  </desktop-only-component>
  <section class="mt-[40px] lg:mt-4 px-4 container mx-auto">
    <n-list>
      <n-list-item v-for="order in userStore.orders" :key="order.id" style="padding: 0;">
        <div
            class="order-card py-4 flex gap-2"
        >
          <div>
            <n-image
                class="w-[70px] h-[70px] rounded"
                :src="order.goods[0].product.pictures.length > 0 ? order.goods[0].product.pictures[0].image : ''"></n-image>
          </div>
          <div>
            <div class="order-card-body">
              <div>
                <n-ellipsis class="text-lg font-medium" style="max-width: 280px">
                  {{order.goods.map(good=>good.product.name).join(',')}}
                </n-ellipsis>
              </div>
              <div class="order-info flex w-full items-center gap-2 mt-1">
                <n-tag
                    v-if="order.status === 'Завершен'"
                    type="success"
                >
                  {{ order.status }}
                </n-tag>
                <div class="w-full justify-between" v-else-if="order.status === 'В процессе'">
                  <n-tag
                      type="warning"
                  >
                    {{ order.status }}
                  </n-tag>
                </div>
                <n-tag
                    v-else
                    type="error"
                >
                  {{ order.status }}
                </n-tag>
              </div>
              <div class="order-info flex items-center gap-2 mt-1">
                <div class="info-value text-lg">{{ order.total }} KZT</div>
              </div>
              <div class="order-info">
                <div class="info-value text-sm">{{ timeAgo(order.created_at) }}</div>
              </div>
              <div class="mt-2" v-if="order.status === 'В процессе'">
                <n-button size="tiny" @click="activeCancelOrder=order.id">Отменить заказ</n-button>
              </div>
            </div>
          </div>
        </div>
      </n-list-item>
    </n-list>
  </section>
</main>
</template>

<style scoped>

</style>