<template>
  <div class="replies">
    <div class="reply-item" v-for="reply in replies" :key="reply.id">
      <span>{{ reply.author }} 回复 {{ reply.to }}：{{ reply.content }}</span>
      <div class="reply-meta">
        <span>{{ reply.time }}</span>
        <el-button
          link
          class="reply-button"
          @click="$emit('reply-to', reply.author)"
        >
          回复
        </el-button>
        <el-button
          v-if="reply.author === currentUser"
          link
          class="delete-button"
          @click="$emit('delete-reply', reply)"
        >
          删除
        </el-button>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="total > repliesPerPage" class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :page-size="repliesPerPage"
        :total="total"
        :current-page="currentPage"
        @current-change="$emit('page-change', $event)"
        size="large"
        :hide-on-single-page="true"
        prev-text="上一页"
        next-text="下一页"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  replies: Array,
  total: Number,
  currentPage: Number,
  repliesPerPage: Number,
  currentUser: String
})

defineEmits(['page-change', 'reply-to', 'delete-reply'])
</script>

<style lang="scss" scoped>
.replies {
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #ddd;

  .reply-item {
    margin-top: 10px;

    .reply-meta {
      margin-top: 5px;
      font-size: 15px;
      color: #95999f;

      .reply-button,
      .delete-button {
        margin-left: 5px;
        color: #4eabe6;
        padding: 0;

        &:hover {
          color: #3a8ee6;
        }
      }
    }
  }

  .pagination {
    margin-top: 10px;
  }
}
</style>
