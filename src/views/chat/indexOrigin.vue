<template>
  <div class="chat-area">
    <div v-for="message in messages" :key="message.id" class="chart-content">
      <div class="avatar">{{ message.author }}</div>
      <div class="message">
        <div class="message-content">
          <div class="content">
            {{ message.content }}
          </div>
          <div class="message-conOption">
            <span>{{ message.time }}</span>
            <span @click="replyToMessage(message)">回复</span>
          </div>
        </div>
        <!-- 回复列表 -->
        <div v-if="message.isExpanded" class="replies">
          <div
            v-for="reply in message.replies"
            :key="reply.id"
            class="reply-item"
          >
            <span
              >{{ reply.author }} 回复 {{ reply.to }}：{{ reply.content }}</span
            >
            <!-- 时间和回复按钮 -->
            <div class="reply-meta">
              <span>{{ reply.time }}</span>
              <!-- 回复按钮 -->
              <span
                class="replayTwoLevel"
                @click="replyToMessage(message, reply.author)"
                >回复</span
              >
            </div>
          </div>
        </div>

        <div class="message-actions">
          <span v-if="message.replies.length > 0">
            共 {{ message.replies.length }} 条回复，
          </span>
          <!-- 展开/收起回复按钮 -->
          <span
            class="isExpand"
            v-if="message.replies.length > 0"
            @click="toggleReplies(message)"
          >
            {{ message.isExpanded ? '收起' : '点击查看' }}
          </span>
        </div>

        <!-- 回复输入框 -->
        <div
          v-if="replyTarget.message === message && isReplyBoxVisible"
          class="reply-box"
        >
          <el-input
            v-model="newReply"
            :placeholder="placeholderTip"
            type="textarea"
            maxlength="50"
            show-word-limit
          />
          <el-button type="primary" @click="sendReply" style="height: 100%"
            >发送</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { chatData } from '@/assets/js/chat'
import moment from 'moment'
// 当前用户
const currentUser = '暖心pro'

// 初始化消息列表
const messages = ref(chatData)

// 定义响应式变量
const newReply = ref('')
const replyTarget = ref({ message: null, to: null })
const isReplyBoxVisible = ref(false)

const placeholderTip = computed(() => {
  return replyTarget.value.to
    ? `回复 @${replyTarget.value.to}:`
    : `回复 ${replyTarget.value.message.author}:`
})

// 展开或收起回复内容
const toggleReplies = (message) => {
  message.isExpanded = !message.isExpanded
}

// 点击“回复”按钮
const replyToMessage = (message, to = null) => {
  if (
    replyTarget.value.message === message &&
    isReplyBoxVisible.value &&
    replyTarget.value.to === to
  ) {
    isReplyBoxVisible.value = false
    replyTarget.value = { message: null, to: null }
    newReply.value = ''
  } else {
    replyTarget.value = { message, to }
    isReplyBoxVisible.value = true
    newReply.value = ''
  }
}

// 发送回复
const sendReply = () => {
  if (newReply.value.trim()) {
    const newReplyObj = {
      id: Date.now(),
      author: currentUser,
      to: replyTarget.value.to || replyTarget.value.message.author,
      content: newReply.value,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    replyTarget.value.message.replies.unshift(newReplyObj)

    if (!replyTarget.value.message.isExpanded) {
      replyTarget.value.message.isExpanded = true
    }

    newReply.value = ''
    replyTarget.value = { message: null, to: null }
    isReplyBoxVisible.value = false
  }
}
</script>

<style lang="scss" scoped>
.chat-area {
  max-width: 800px;
  margin: auto;
  padding: 10px;
  .chart-content {
    display: flex;
    column-gap: 10px;
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
      padding: 10px;
      border-bottom: 1px solid #ddd;
      flex: 0 0 85%;
      .message-content {
        .content {
          font-size: 23px;
          line-height: 1.5;
        }
        .message-conOption {
          font-size: 15px;
          margin: 10px 0;
          color: #95999f;
          span:first-child {
            margin-right: 5px;
          }
          span:last-child {
            margin-left: 5px;
          }
        }
      }

      .message-actions {
        margin-top: 5px;
        font-size: 15px;
        color: #95999f;
        .isExpand {
          margin-right: 5px;
          cursor: pointer;
        }
        .isExpand:hover {
          color: #4eabe6;
        }
      }

      .replies {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 2px solid #ddd;

        .reply-item {
          margin-top: 10px;

          .reply-meta {
            margin-top: 5px;
            display: flex;
            align-items: center;
            font-size: 15px;
            span {
              color: #95999f;
              margin-right: 10px;
            }
            .replayTwoLevel {
              cursor: pointer;
            }
            .replayTwoLevel:hover {
              color: #4eabe6;
            }
          }
        }
      }

      .reply-box {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .replying-to {
          margin-bottom: 5px;
          color: #555;
        }

        button {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
