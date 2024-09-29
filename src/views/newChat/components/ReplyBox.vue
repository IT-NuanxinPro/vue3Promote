<template>
  <div class="reply-box">
    <el-input
      v-model="content"
      :placeholder="placeholder"
      type="textarea"
      maxlength="200"
      show-word-limit
    />
    <el-button
      type="primary"
      @click="handleSend"
      :loading="loading"
      style="height: 100%"
    >
      发送
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

defineProps({
  placeholder: String
})

const emit = defineEmits(['send-reply'])

const content = ref('')
const loading = ref(false)

const handleSend = () => {
  if (!content.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }

  loading.value = true
  try {
    emit('send-reply', content.value.trim())
    content.value = ''
  } catch (error) {
    ElMessage.error('发送回复失败')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.reply-box {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .el-input {
    flex: 1;
  }

  .el-button {
    margin-left: 5px;
  }
}
</style>
