<template>
  <transition-group name="fade-slide" tag="div" class="account-group">
    <el-form
      v-for="(account, index) in accounts"
      :key="account.id"
      :model="accounts[index]"
      :rules="rules"
      label-position="top"
      ref="formRefs"
      status-icon
    >
      <AccountItem
        v-model="accounts[index]"
        :show-labels="index === 0"
        @remove="remove(index)"
      />
    </el-form>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountItem from './AccountItem.vue'
import type { Account } from '@/types/Account'
import type { FormInstance, FormRules } from 'element-plus'
import { accountRules } from '@/validators/AccountRules'

const props = defineProps<{ accounts: Account[] }>()
const emit = defineEmits<{ (e: 'remove', index: number): void }>()

function remove(index: number) {
    emit('remove', index)
  }

// Правила для всей формы
const rules = accountRules
  
  

  // refs для доступа к формам
const formRefs = ref<FormInstance[]>()
</script>
