import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: 'login', 
  }),
  actions: {
    switchToLogin() {
      this.currentPage = 'login'; 
    },
    switchToRegister() {
      this.currentPage = 'register'; 
    },
  },
});

