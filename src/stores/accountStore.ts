import { defineStore } from 'pinia';
import type { AccountItem } from '@/types/Account';

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as AccountItem[],
  }),
  actions: {
    addAccount(account: AccountItem) {
      this.accounts.push(account);
      this.saveToLocalStorage();
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter(a => a.id !== id);
      this.saveToLocalStorage();
    },
    updateAccount(updated: AccountItem) {
      const index = this.accounts.findIndex(a => a.id === updated.id);
      if (index !== -1) {
        this.accounts[index] = updated;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('accounts');
      if (data) {
        this.accounts = JSON.parse(data);
      }
    },
  },
});
