// stores/userStore.ts
import { defineStore } from "pinia";
import axiosInstance from "~/api";

export interface User {
  city: number;
  password: string;
  password2?: string;
  last_login?: string;
  phone: string;
  email?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  profile_type: number;
  postcode?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
}

export interface UserAuthPayload {
  password: string;
  phone: string;
}

interface AuthStore {
  user?: User;
  authenticated: boolean;
  isLoadingUser: boolean;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthStore => ({
    user: {
      city: 3,
      password: "",
      phone: "",
      email: undefined,
      first_name: "",
      last_name: "",
      middle_name: undefined,
      profile_type: 1,
      postcode: undefined,
    },
    isLoadingUser: false,
    authenticated: false,
  }),
  actions: {
    async loadUser() {
      this.$state.isLoadingUser = true;
      return await axiosInstance
        .get("/api/users/me/")
        .then((res) => {
          this.$state.user = res.data;
        })
        .catch((e) => {})
        .finally(() => {
          this.$state.isLoadingUser = false;
        });
    },
  },
});

export const rules = {
  password: {
    required: true,
    type: "string",
    min: 1,
    max: 128,
    message: "Password is required",
    trigger: "blur",
  },
  phone: {
    required: true,
    message: "Invalid phone number",
    trigger: "blur",
  },
  first_name: {
    required: true,
    type: "string",
    min: 1,
    max: 255,
    message: "First name is required",
    trigger: "blur",
  },
  last_name: {
    required: true,
    type: "string",
    min: 1,
    max: 255,
    message: "Last name is required",
    trigger: "blur",
  },
};
