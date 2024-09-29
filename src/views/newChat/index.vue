<template>
  <div class="chat-area">
    <!-- 消息列表 -->
    <div class="message-item" v-for="message in messageList" :key="message.id">
      <div class="avatar">{{ message.author }}</div>
      <div class="message">
        <div class="message-content">
          <div class="content">{{ message.content }}</div>
          <div class="message-conOption">
            <span>{{ message.time }}</span>
            <el-button link @click="toggleReplyBox(message)">
              {{
                replyBoxVisible && currentMessage.id === message.id
                  ? '取消回复'
                  : '回复'
              }}
            </el-button>
          </div>
        </div>

        <!-- 回复列表 -->
        <div v-if="message.isExpanded" class="reply-list">
          <template v-if="loading && currentMessage.id === message.id">
            <div class="loading">
              <el-icon><Loading /></el-icon>
              加载中...
            </div>
          </template>
          <template v-else>
            <ReplyList
              :replies="paginatedReplies"
              :total="message.replies.length"
              :current-page="currentPage"
              :replies-per-page="repliesPerPage"
              :current-user="currentUser"
              @page-change="handlePageChange"
              @reply-to="handleReplyTo"
              @delete-reply="deleteReply"
            />
          </template>
        </div>

        <!-- 展开/收起回复 -->
        <div class="message-actions">
          <span v-if="message.replies.length > 0">
            共 {{ message.replies.length }} 条回复，
          </span>
          <el-button
            link
            v-if="message.replies.length > 0"
            @click="toggleReplies(message)"
          >
            {{ message.isExpanded ? '收起' : '点击查看' }}
          </el-button>
        </div>

        <!-- 回复输入框 -->
        <ReplyBox
          v-if="replyBoxVisible && currentMessage.id === message.id"
          :placeholder="placeholderTip"
          @send-reply="sendReply"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ReplyList from './components/ReplyList.vue'
import ReplyBox from './components/ReplyBox.vue'
import {
  fetchMessages,
  fetchReplies,
  sendReplyApi,
  deleteReplyApi
} from '@/api'
import { Loading } from '@element-plus/icons-vue'

const messageList = ref([])
const currentMessage = ref(null)
const currentUser = '当前用户'
const replyBoxVisible = ref(false)
const replyTarget = ref(null)
const loading = ref(false)

const repliesPerPage = 8
const currentPage = ref(1)

const paginatedReplies = ref([])

const placeholderTip = computed(() => {
  return replyTarget.value
    ? `回复 @${replyTarget.value}:`
    : currentMessage.value
      ? `回复 ${currentMessage.value.author}:`
      : '请输入回复内容'
})

// 加载消息列表
const loadMessages = async () => {
  try {
    messageList.value = await fetchMessages()
  } catch (error) {
    ElMessage.error('加载消息列表失败')
  }
}

// 切换回复输入框显示
const toggleReplyBox = (message) => {
  if (replyBoxVisible.value && currentMessage.value.id === message.id) {
    replyBoxVisible.value = false
    replyTarget.value = null
  } else {
    replyBoxVisible.value = true
    currentMessage.value = message
    replyTarget.value = null
  }
}

// 展开或收起回复列表
const toggleReplies = async (message) => {
  message.isExpanded = !message.isExpanded
  currentPage.value = 1
  currentMessage.value = message

  if (message.isExpanded) {
    await loadReplies(message)
  }
}

// 加载回复列表
const loadReplies = async (message) => {
  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const updatedMessage = await fetchReplies(message.id)
    message.replies = updatedMessage.replies
    updatePaginatedReplies(message)
  } catch (error) {
    ElMessage.error('加载回复列表失败')
  } finally {
    loading.value = false
  }
}

const updatePaginatedReplies = (message) => {
  const start = (currentPage.value - 1) * repliesPerPage
  const end = start + repliesPerPage
  paginatedReplies.value = message.replies.slice(start, end)
}

const handlePageChange = (page) => {
  currentPage.value = page
  updatePaginatedReplies(currentMessage.value)
}

// 处理二级回复
const handleReplyTo = (author) => {
  replyBoxVisible.value = true
  replyTarget.value = author
}

// 发送回复
const sendReply = async (content) => {
  if (!currentMessage.value) {
    ElMessage.error('未选择消息')
    return
  }

  // loading.value = true
  try {
    const newReply = {
      id: Date.now(),
      author: currentUser,
      to: replyTarget.value || currentMessage.value.author,
      content,
      time: new Date().toLocaleString()
    }

    const result = await sendReplyApi(currentMessage.value.id, newReply)

    if (result.success) {
      currentMessage.value.replies.unshift(newReply)

      // 如果回复列表未展开，自动展开并加载回复列表
      if (!currentMessage.value.isExpanded) {
        currentMessage.value.isExpanded = true
        await loadReplies(currentMessage.value)
      } else {
        updatePaginatedReplies(currentMessage.value)
      }

      ElMessage.success('回复发送成功')
    } else {
      throw new Error(result.message || '发送回复失败')
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    // loading.value = false
    replyBoxVisible.value = false
    replyTarget.value = null
  }
}

// 删除回复
const deleteReply = async (reply) => {
  loading.value = true
  try {
    const result = await deleteReplyApi(currentMessage.value.id, reply.id)

    if (result.success) {
      const index = currentMessage.value.replies.findIndex(
        (r) => r.id === reply.id
      )
      if (index !== -1) {
        currentMessage.value.replies.splice(index, 1)
        updatePaginatedReplies(currentMessage.value)
      }
      ElMessage.success('回复已删除')
    } else {
      throw new Error(result.message || '删除回复失败')
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMessages()
})
</script>

<style lang="scss" scoped>
.chat-area {
  max-width: 800px;
  margin: auto;
  padding: 10px;

  .message-item {
    display: flex;
    column-gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    .avatar {
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    .message {
      flex: 1;

      .message-content .content {
        font-size: 23px;
        line-height: 1.5;
      }

      .message-conOption {
        display: flex;
        align-items: center;
        column-gap: 5px;
        font-size: 15px;
        margin: 10px 0;
        color: #95999f;

        .el-button {
          padding: 0;
          color: #4eabe6;

          &:hover {
            color: #3a8ee6;
          }
        }
      }

      .message-actions {
        font-size: 15px;
        color: #95999f;
        margin-top: 5px;

        .el-button {
          padding: 0;
          color: #4eabe6;

          &:hover {
            color: #3a8ee6;
          }
        }
      }

      .loading {
        display: flex;
        align-items: center;
        color: #4eabe6;
        font-size: 16px;

        .el-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
