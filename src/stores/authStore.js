import { defineStore } from "pinia";
// 製作store的調用函數名稱
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    user: JSON.parse(localStorage.getItem("user") || "{}"),
  }),

  actions: {
    login({ token, role, user }) {
      this.token = token;
      this.role = role;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.token = "";
      this.role = "";
      this.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});
