<template>
  <transition-group name="fade-slide" tag="div" class="account-group">
    <el-form
      v-for="(account, index) in accounts"
      :key="account.id"
      :model="accounts[index]"
      :rules="rules"
      label-position="top"
      :ref="el => formRefs[index] = el"
      status-icon
    >
      <AccountItem
        :model-value="account"
        :show-labels="index === 0"
        @update:modelValue="value => updateAccount(index, value)"
        @remove="remove(index)"
      />
    </el-form>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountItem from './AccountItem.vue'
import type { Account } from '@/types/Account'
import type { FormInstance } from 'element-plus'
import { accountRules } from '@/validators/AccountRules'

const props = defineProps<{ accounts: Account[] }>()
const emit = defineEmits<{
  (e: 'remove', index: number): void
  (e: 'update', index: number, updated: Account): void
}>()

const remove = (index: number) => emit('remove', index)

const updateAccount = (index: number, updated: Account) => {
  emit('update', index, updated)
}


const rules = accountRules
const formRefs = ref<(FormInstance | null)[]>([])

</script>
