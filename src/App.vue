<template>
  <AccountPage />
</template>

<script setup lang="ts">
import AccountPage from './pages/AccountPage.vue'
import { AccountStore } from '@/stores/AccountStore'

const accountStore = AccountStore()
accountStore.loadFromLocalStorage()
</script>
