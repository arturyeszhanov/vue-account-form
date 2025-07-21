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
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{ accounts: Account[] }>()
const emit = defineEmits<{
  (e: 'remove', index: number): void
  (e: 'update', index: number, updated: Account): void
}>()





// 1. Правила прямо тут
const rules: FormRules = {
  type: [
    {
      required: true,
      message: 'Выберите тип',
      trigger: 'change',
    },
    {
      validator: (_, value, callback) => {
        // если пользователь не выбрал тип
        if (!value) {
          callback(new Error('Тип не выбран'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  login: [
    {
      required: true,
      message: 'Введите логин',
      trigger: 'blur',
    },
  ],
  password: [
    {
      validator: (_, value, callback, source) => {
        const isLocal = source?.type === 'local'
        const isLdap = source?.type === 'ldap'

        if (isLocal && !value) {
          callback(new Error('Пароль обязателен для local'))
        } else {
          callback() // пароль может быть null для ldap
        }
      },
      trigger: 'blur',
    },
  ],
}


// 2. refs на каждый el-form
const formRefs = ref<(FormInstance | null)[]>([])

// 3. Метод полной валидации
async function validateAll() {
  const results = await Promise.all(
    formRefs.value.map(async form => {
      if (!form) return false
      try {
        await form.validate()
        return true
      } catch (err) {
        return false
      }
    })
  )

  const allValid = results.every(result => result === true)

  if (allValid) {
    console.log('✅ Все формы валидны. Сохраняем.')
    localStorage.setItem('accounts', JSON.stringify(props.accounts))
  } else {
    console.warn('⚠️ Некоторые формы содержат ошибки.')
  }
}

const remove = (index: number) => emit('remove', index)

const updateAccount = async (index: number, updated: Account) => {
  // Обновим модель вручную
  props.accounts[index] = updated

  const form = formRefs.value[index]
  if (!form) return

  try {
    await form.validate()
    emit('update', index, updated)
  } catch (err) {
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
