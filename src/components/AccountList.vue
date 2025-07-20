<template>
  <transition-group name="fade-slide" tag="div" class="account-group">
    <AccountItem
      v-for="(account, index) in accounts"
      :key="account.id"
      v-model="accounts[index]"
      :show-labels="index === 0"
      @remove="remove(index)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import AccountItem from './AccountItem.vue'
import type { Account } from '@/types'

defineProps<{
  accounts: Account[]
}>()

const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()

function remove(index: number) {
  emit('remove', index)
}
</script>
