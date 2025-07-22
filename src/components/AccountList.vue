<template>
  <transition-group name="fade-slide" tag="div" class="account-group">
    <el-form
      v-for="(account, index) in accounts"
      :key="account.id"
      :model="accounts[index]"
      :rules="accountFormRules"
      label-position="top"
      :ref="el => formRefs[index] = el"
      status-icon
    >
      <AccountItem
        :model-value="account"
        :show-labels="index === 0"
        :form-ref="formRefs[index]"
        @update:modelValue="value => updateAccount(index, value)"
        @remove="remove(index)"
        @blur="validateRequiredFields(index)"
      />
    </el-form>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountItem from './AccountItem.vue'
import type { Account } from '@/types/Account'
import { accountFormRules } from '@/validators/AccountRules'

const props = defineProps<{ accounts: Account[] }>()
const emit = defineEmits<{
  (e: 'remove', index: number): void
  (e: 'update', index: number, updated: Account): void
}>()


const rules = accountFormRules


// 2. refs на каждый el-form
const formRefs = ref<(FormInstance | null)[]>([])


const remove = (index: number) => emit('remove', index)



const updateAccount = async (index: number, updated: Account) => {
  props.accounts[index] = updated
  const form = formRefs.value[index]
  if (!form) return

  try {
    await form.validate()
    emit('update', index, updated)
  } catch {
    console.warn(`⚠️ Строка ${index + 1} невалидна, не сохраняем`)
  }
}



</script>


<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
