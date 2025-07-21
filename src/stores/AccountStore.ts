import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account, NewAccount } from '@/types'

export const AccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

  function addAccount(account: NewAccount) {
    const newAccount: Account = {
      ...account,
      id: crypto.randomUUID(),
      password: account.password ?? null,
      dirty: false
    }
    accounts.value.push(newAccount)
  }

  function removeAccount(index: number) {
    accounts.value.splice(index, 1)
    saveToLocalStorage()
  }

  function updateAccount(index: number, updated: Account) {
    accounts.value.splice(index, 1, updated)
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  function loadFromLocalStorage() {
    const stored = localStorage.getItem('accounts')
    if (stored) {
      const parsed = JSON.parse(stored) as Account[]
      accounts.value.splice(0, accounts.value.length, ...parsed)
    }
  }

  loadFromLocalStorage()

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
