import { defineStore, getActivePinia } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAlertStore } from "./alertStore";
import { useCartStore } from "./cartStore";
import { postDataAPI, patchDataAPI } from "@/utils/fetchData";
import { useException } from "@/hook/exception";

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref({});
  const userId = ref("");
  const token = ref("");

  const router = useRouter();

  // Declare other stores
  const alertStore = useAlertStore();
  const cartStore = useCartStore();

  // Actions
  const register = async (userData) => {
    try {
      const res = await postDataAPI({ url: "register", data: userData });
      setUser(res.data.user, res.data.accessToken);
      cartStore.getCart();
      router.push({ name: "Home" });
    } catch (err) {
      useException(err);
      console.error({ errorRegister: err });
    }
  };

  const login = async (userData) => {
    try {
      const res = await postDataAPI({ url: "login", data: userData });
      console.log({ res });

      setUser(res.data.user, res.data.accessToken);

      await cartStore.getCart();

      if (res.data.user.role === "admin") router.push("/admin");
      else router.push({ name: "Home" });
    } catch (error) {
      console.log({ errorLogin: error });
      useException(error);
    }
  };

  const logout = async () => {
    try {
      await postDataAPI({ url: "logout", token: token.value });
      localStorage.clear();
      getActivePinia()._s.forEach((store) => store.$dispose());
      window.location.href = "/login";
      // router.push({ name: 'Login' });
    } catch (error) {
      console.log({ errorLogout: error });
      useException(error);
    }
  };

  const setUser = (newUser, newToken) => {
    user.value = newUser;
    userId.value = newUser._id;
    token.value = newToken;
  };

  const updateUser = async (data) => {
    try {
      if (data.phone) user.value.phone = data.phone;
      if (data.address)
        user.value.address = [...user.value.address, data.address];
      if (data.addressDelete)
        user.value.address = user.value.address.filter(
          (item) => item !== data.addressDelete,
        );

      await patchDataAPI({
        url: `profile/${userId.value}`,
        data,
        token: token.value,
      });
    } catch (error) {
      console.error({ errorUpdateUser: error });
      useException(error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await postDataAPI({ url: "refresh_token" });
      token.value = res.data.accessToken;
      return res.data.accessToken;
    } catch (error) {
      console.error({ errorRefreshToken: error });
    }
  };

  const isAuthValid = () => {
    return token.value.length > 0 ? true : false;
  };

  const isAdmin = () => user.value.role === "admin";

  return {
    user,
    userId,
    token,
    refreshToken,
    isAuthValid,
    isAdmin,
    register,
    login,
    logout,
    updateUser,
  };
});
