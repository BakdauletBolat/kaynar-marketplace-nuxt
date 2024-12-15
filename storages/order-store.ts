import { defineStore } from "pinia";
import axiosInstance from "~/api";
import type { IDefaultAPI } from "~/api/interfaces";
import { CardStorage } from "@/storages/storage";

export interface Address {
  address: string;
  postal_code: string;
  apartment: string;
  building: string;
}

export interface UserInfo {
  first_name: string | undefined;
  last_name: string | undefined;
  phone_number: string | undefined;
  email: string | undefined;
}

export const useOrderStore = defineStore("order-store", {
  state: () => {
    return {
      activeTab: 0,
      createdAddressId: undefined as number | undefined,
      userInfo: {
        first_name: undefined,
        last_name: undefined,
        phone_number: undefined,
        email: undefined,
      } as UserInfo,
      isLoadingAddressCreate: false,
      isOrderCreateLoading: false,
      userForm: null as IDefaultAPI | null,
      paymentTypeId: 2 as number | undefined,
      deliveryTypeId: 1 as number | undefined,
      order: undefined,
    };
  },
  actions: {
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    createAddress(address: Address) {
      this.isLoadingAddressCreate = true;
      axiosInstance
        .post("/api/address/", address)
        .then((res) => {
          this.createdAddressId = res.data.id;
        })
        .finally(() => {
          this.isLoadingAddressCreate = false;
        });
    },
    createOrder() {
      this.isOrderCreateLoading = true;
      const cardStorage = CardStorage.getInstance();
      const body = {
        warehouse_id: 1071724,
        payment_type_id: this.paymentTypeId,
        delivery_type_id: this.deliveryTypeId,
        comment: null,
        client: "Гость",
        first_name: this.userInfo.first_name,
        last_name: this.userInfo.last_name,
        email: this.userInfo.email,
        phone_number: this.userInfo.phone_number,
        address: this.createdAddressId,
        goods: cardStorage.goods.value.map((item) => {
          return {
            product_id: item.id,
            quantity: item.quantity,
            quality_id: 1,
          };
        }),
      };
      axiosInstance
        .post("/api/orders/", body)
        .then((res) => {
          this.order = res.data;
          cardStorage.resetCard();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isOrderCreateLoading = false;
        });
    },
    changeTab(tab: number) {
      window.scrollTo({
        top: 0,
      });
      this.activeTab = tab;
    },
  },
});
