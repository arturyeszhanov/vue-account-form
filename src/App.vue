<template>
  <div class="container">
    <div class="title">
      <h2>Учетные записи</h2>
      <el-button type="primary" class="add-btn" @click="addAccount">
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>
    <div class="subtitle">
      <el-icon class="subtitle-icon">
        <QuestionFilled />
      </el-icon>
      <span>Для указания нескольких меток для одной пары <strong>логин/пароль</strong> используйте разделитель <strong>;</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
function addAccount() {
  console.log('Добавить запись')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.container {
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
}
.title {
  display: flex;
  align-items: center;
  gap: 12px; /* расстояние между заголовком и кнопкой */
  margin-bottom: 16px;
  font-family: Inter, sans-sarif;
  font-weight: 400;
}
.add-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 4px; /* квадратная форма */
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn .el-icon {
  font-size: 24px;  /* увеличить размер плюса */
  font-weight: bold; /* сделать жирнее */
}

/* Абзац с иконкой */
.subtitle {
  font-family: Inter, sans-sarif;
  font-weight: 400;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #555;
}

.subtitle-icon {
  margin-right: 8px;
  color: #409eff;
  font-size: 26px;
}
</style>
