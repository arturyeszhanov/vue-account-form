<template>
  <div>
    <el-page-header content="Учетные записи" class="mb-4" />

    <el-button type="primary" @click="addAccount" class="mb-4">+ Добавить</el-button>

    <el-form
      v-for="(account, index) in accounts"
      :key="account.id"
      label-width="120px"
      class="box-card"
      :model="account"
      style="margin-bottom: 20px"
    >
      <el-form-item label="Метка">
        <el-input v-model="account.label" placeholder="метка1;метка2" />
      </el-form-item>

      <el-form-item label="Тип записи">
        <el-select v-model="account.type" placeholder="Выберите тип">
          <el-option label="Локальная" value="local" />
          <el-option label="LDAP" value="ldap" />
        </el-select>
      </el-form-item>

      <el-form-item label="Логин" required>
        <el-input v-model="account.login" />
      </el-form-item>

      <el-form-item label="Пароль" v-if="account.type === 'local'" required>
        <el-input v-model="account.password" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="removeAccount(index)">Удалить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Account {
  id: number
  label: string
  type: 'local' | 'ldap'
  login: string
  password: string | null
}

const accounts = ref<Account[]>([])

function addAccount() {
  accounts.value.push({
    id: Date.now(),
    label: '',
    type: 'local',
    login: '',
    password: ''
  })
}

function removeAccount(index: number) {
  accounts.value.splice(index, 1)
}
</script>

<style scoped>
.box-card {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}
</style>
