<template>
  <div class="account-row">
    <!-- Метка -->
    <el-form-item
      :label="showLabels ? 'Метка' : ''"
      class="input-item input-label"
      label-position="top"
    >
      <el-input
        :model-value="modelValue.label"
        @input="val => updateField('label', val)"
        placeholder="Значение"
      />
    </el-form-item>

    <!-- Тип записи -->
    <el-form-item
      :label="showLabels ? 'Тип записи' : ''"
      class="input-item input-type"
      label-position="top"
    >
      <el-select
        :model-value="modelValue.type"
        @update:modelValue="onTypeChange"
        placeholder="Значение"
      >
        <el-option label="Локальная" value="local" />
        <el-option label="LDAP" value="ldap" />
      </el-select>
    </el-form-item>

    <!-- Логин -->
    <el-form-item
      :label="showLabels ? 'Логин' : ''"
      :class="['input-item', 'input-login', { 'full-width': modelValue.type === 'ldap' }]"
      label-position="top"
    >
      <el-input
        :model-value="modelValue.login"
        @input="val => updateField('login', val)"
        placeholder="Значение"
      />
    </el-form-item>

    <!-- Пароль (по умолчанию отображается, кроме LDAP) -->
    <el-form-item
      v-if="modelValue.type !== 'ldap'"
      :label="showLabels ? 'Пароль' : ''"
      class="input-item input-password"
      label-position="top"
    >
    <el-input
        :model-value="modelValue.password"
        @input="val => updateField('password', val)"
        placeholder="Значение"
        show-password
    />
    </el-form-item>

    <!-- Кнопка удаления -->
    <el-button
        :icon="Delete"
        type="danger"
        @click="$emit('remove')"
        class="remove-btn"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object as () => {
      label: string
      type: 'local' | 'ldap'
      login: string
      password: string | null
    },
    required: true
  },
  showLabels: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function updateField(field: string, value: any) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function onTypeChange(value: 'local' | 'ldap') {
  emit('update:modelValue', {
    ...props.modelValue,
    type: value,
    password: value === 'ldap' ? null : props.modelValue.password ?? ''
  })
}


</script>

<style scoped>
.account-row {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #737373;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.input-item {
  flex: 0 0 auto;
  box-sizing: border-box;
}

.input-label {
  flex: 0 0 27%;
}

.input-type {
  flex: 0 0 17%;
}

.input-login {
  flex: 0 0 23%;
}

.input-password {
  flex: 0 0 23%;
}

.remove-btn {
  flex: 0 0 5%;
  min-width: 20px;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
}

/* При LDAP логин растягивается на две ячейки (логин + пароль) */
.input-login.full-width {
  flex: 0 0 calc(46% + 8px);
}

.el-select-dropdown__item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
}
</style>
