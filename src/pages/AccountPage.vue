<template>
  <div class="container">
    <div class="header">
		<div class="title">
        	<h2>Учетные записи</h2>
			<el-button type="primary" class="add-btn" @click="addAccount">
			<el-icon><Plus /></el-icon>
			</el-button>
		</div>
		<div class="count">
			<span>Всего аккаунтов: {{ accounts.length }}</span>
		</div>
    </div>
    <div class="subtitle">
      <el-icon class="subtitle-icon">
        <QuestionFilled />
      </el-icon>
      <span>
        Для указания нескольких меток для одной пары <strong>логин/пароль</strong> используйте разделитель <strong>;</strong>
      </span>
    </div>

    <AccountList :accounts="store.accounts" @remove="removeAccount" @update="updateAccount"/>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import AccountList from '@/components/AccountList.vue'
import type { Account } from '@/types/Account'
import { AccountStore } from '@/stores/AccountStore'

const store = AccountStore()
const accounts = store.accounts

onMounted(() => { store.loadFromLocalStorage()})

function addAccount() {
  store.addAccount({
	id: crypto.randomUUID(),
    label: '',
    type: null,
    login: '',
    password: '',
	dirty: false
  })
}

function removeAccount(index: number) {
  store.removeAccount(index)
}

function updateAccount(index: number, updated: Account) {
  store.updateAccount(index, updated)
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.container {
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: #fff;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.title {
  display: flex;
  align-items: center;
  gap: 12px; /* расстояние между заголовком и кнопкой */
  margin-bottom: 16px;
  font-family: Inter, sans-sarif;
  font-weight: 400;
}
.count {
	font-family: Inter, sans-serif;
	font-weight: 500;
	font-size: 14px;
}
.add-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-btn .el-icon {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-family: Inter, sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #555;
  margin-bottom: 30px;
}
.subtitle-icon {
  margin-right: 8px;
  color: #409eff;
  font-size: 26px;
}
</style>
