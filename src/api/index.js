// 模拟消息列表
let messages = [
  {
    id: 1,
    author: '用户A',
    content: '这个产品真的很好用，推荐给大家！',
    time: '2024-09-25 18:00',
    replies: [
      {
        id: 1,
        author: '用户B',
        to: '用户A',
        content: '确实不错，我也在用。',
        time: '2024-09-25 18:05:22'
      },
      {
        id: 2,
        author: '用户C',
        to: '用户B',
        content: '请问具体有什么优势呢？',
        time: '2024-09-25 18:10:45'
      },
      {
        id: 3,
        author: '用户D',
        to: '用户C',
        content: '我觉得使用起来非常流畅，功能也很全面。',
        time: '2024-09-25 18:15:30'
      },
      {
        id: 4,
        author: '用户E',
        to: '用户A',
        content: '谢谢推荐，我打算试试看。',
        time: '2024-09-25 18:20:10'
      },
      {
        id: 5,
        author: '用户F',
        to: '用户E',
        content: '一起交流使用心得吧！',
        time: '2024-09-25 18:25:55'
      },
      {
        id: 6,
        author: '用户G',
        to: '用户F',
        content: '好主意，我也想了解更多。',
        time: '2024-09-25 18:30:40'
      },
      {
        id: 7,
        author: '用户H',
        to: '用户G',
        content: '这个产品的售后服务也很好。',
        time: '2024-09-25 18:35:25'
      },
      {
        id: 8,
        author: '用户I',
        to: '用户H',
        content: '是的，上次有问题客服很快就解决了。',
        time: '2024-09-25 18:40:15'
      },
      {
        id: 9,
        author: '用户J',
        to: '用户I',
        content: '看来值得入手，谢谢大家的分享。',
        time: '2024-09-25 18:45:05'
      },
      {
        id: 10,
        author: '用户K',
        to: '用户J',
        content: '不客气，有问题可以一起讨论。',
        time: '2024-09-25 18:50:50'
      },
      {
        id: 11,
        author: '用户L',
        to: '用户A',
        content: '请问在哪里可以买到？',
        time: '2024-09-25 18:55:35'
      }
    ],
    isExpanded: false
  },
  {
    id: 2,
    author: '用户M',
    content: '有谁知道这款产品的最新活动吗？',
    time: '2024-09-25 19:00',
    replies: [
      {
        id: 1,
        author: '用户N',
        to: '用户M',
        content: '官方商城有优惠，赶紧去看看吧。',
        time: '2024-09-25 19:05:22'
      },
      {
        id: 2,
        author: '用户O',
        to: '用户N',
        content: '谢谢提醒，我刚下单了。',
        time: '2024-09-25 19:10:45'
      },
      {
        id: 3,
        author: '用户P',
        to: '用户O',
        content: '优惠力度挺大的，不容错过。',
        time: '2024-09-25 19:15:30'
      }
    ],
    isExpanded: false
  },
  {
    id: 3,
    author: '用户Q',
    content: '请问这款产品适合新手使用吗？',
    time: '2024-09-25 19:20',
    replies: [
      {
        id: 1,
        author: '用户R',
        to: '用户Q',
        content: '非常适合，操作界面很友好。',
        time: '2024-09-25 19:25:10'
      },
      {
        id: 2,
        author: '用户S',
        to: '用户R',
        content: '赞同，上手很快。',
        time: '2024-09-25 19:30:55'
      }
    ],
    isExpanded: false
  },
  {
    id: 4,
    author: '用户T',
    content: '有没有人遇到安装问题？',
    time: '2024-09-25 19:40',
    replies: [
      {
        id: 1,
        author: '用户U',
        to: '用户T',
        content: '可以参考官方教程，很详细。',
        time: '2024-09-25 19:45:22'
      },
      {
        id: 2,
        author: '用户V',
        to: '用户U',
        content: '如果还有问题，可以联系售后。',
        time: '2024-09-25 19:50:45'
      }
    ],
    isExpanded: false
  },
  {
    id: 5,
    author: '用户W',
    content: '产品的质量如何？',
    time: '2024-09-25 20:00',
    replies: [
      {
        id: 1,
        author: '用户X',
        to: '用户W',
        content: '质量不错，用了半年没有问题。',
        time: '2024-09-25 20:05:30'
      },
      {
        id: 2,
        author: '用户Y',
        to: '用户X',
        content: '同感，性价比很高。',
        time: '2024-09-25 20:10:15'
      },
      {
        id: 3,
        author: '用户Z',
        to: '用户Y',
        content: '打算推荐给朋友。',
        time: '2024-09-25 20:15:05'
      }
    ],
    isExpanded: false
  }
]

export const fetchMessages = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages)
    }, 500)
  })
}

export const fetchReplies = (messageId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = messages.find((msg) => msg.id === messageId)
      if (message) {
        resolve(message)
      } else {
        reject(new Error('消息不存在'))
      }
    }, 500)
  })
}

export const sendReplyApi = (messageId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = messages.find((msg) => msg.id === messageId)
      if (message) {
        resolve({ success: true })
      } else {
        resolve({ success: false, message: '消息不存在，无法回复' })
      }
    }, 500)
  })
}

export const deleteReplyApi = (messageId, replyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = messages.find((msg) => msg.id === messageId)
      if (message) {
        const index = message.replies.findIndex((reply) => reply.id === replyId)
        if (index !== -1) {
          // 不在这里修改前端数据，直接返回成功
          resolve({ success: true })
        } else {
          resolve({ success: false, message: '回复不存在，无法删除' })
        }
      } else {
        resolve({ success: false, message: '消息不存在，无法删除回复' })
      }
    }, 500)
  })
}
