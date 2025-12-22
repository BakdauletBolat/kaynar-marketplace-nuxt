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
      addresses: [] as any[], // List of user addresses
      selectedAddressId: undefined as number | undefined, // Currently selected address for order
      userInfo: {
        first_name: undefined,
        last_name: undefined,
        phone_number: undefined,
        email: undefined,
      } as UserInfo,
      isLoadingAddressCreate: false,
      isAddressLoading: false, // Loading state for fetching addresses
      isOrderCreateLoading: false,
      userForm: null as IDefaultAPI | null,
      paymentTypeId: 2 as number | undefined,
      deliveryTypeId: 1 as number | undefined,
      order: undefined
    };
  },
  actions: {
    async loadAddresses() {
      this.isAddressLoading = true;
      try {
        const res = await axiosInstance.get("/api/address/");
        // Assuming the API returns a paginated response or a list. 
        // Based on common patterns in this project, if it's paginated it might be res.data.results or just res.data
        // Let's assume it's an array or we handle it.
        // If the API returns { count: ..., results: [...] }
        this.addresses = Array.isArray(res.data) ? res.data : (res.data.results || []);
        
        // Auto-select the first one if none selected
        if (this.addresses.length > 0 && !this.selectedAddressId) {
            this.selectedAddressId = this.addresses[0].id;
        }
      } catch (e) {
        console.error("Failed to load addresses", e);
      } finally {
        this.isAddressLoading = false;
      }
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    async createAddress(address: Address) {
      this.isLoadingAddressCreate = true;
      try {
          const res = await axiosInstance.post("/api/address/", address);
          this.createdAddressId = res.data.id;
          this.selectedAddressId = res.data.id; // Select the newly created address
          await this.loadAddresses(); // Refresh list
      } catch (e) {
          throw e;
      } finally {
          this.isLoadingAddressCreate = false;
      }
    },
    async createOrder() {
      this.isOrderCreateLoading = true;
      const cardStorage = CardStorage.getInstance();
      
      // Use selectedAddressId if available, otherwise createdAddressId
      const addressId = this.selectedAddressId || this.createdAddressId;

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
        address: addressId,
        goods: cardStorage.goods.value.map((item) => {
          return {
            product_id: item.id,
            quantity: item.quantity,
            quality_id: 1,
          };
        }),
      };
      try {
       const result = await axiosInstance.post("/api/orders/", body);
       this.order = result.data;
       cardStorage.resetCard();
      }
      catch (e) {
        throw e;
      }
      finally {
        this.isOrderCreateLoading = false;
      }
    },
    changeTab(tab: number) {
      window.scrollTo({
        top: 0,
      });
      this.activeTab = tab;
    },
  },
});
