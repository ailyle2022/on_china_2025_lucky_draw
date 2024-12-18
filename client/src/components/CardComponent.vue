<!-- src/components/CardComponent.vue -->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="image" class="image" />
    <div style="padding: 14px">
      <span>{{ level }}等奖 - {{ name }} x {{ quantity }}</span>
      <div class="bottom">
        <el-button class="button" @click="postInterest(id)">{{ $t('home.want_this_prize') }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { postRequest } from '@/services/apiService.js';

export default {
  props: {
    id:{
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  data() {
    return {

    };
  },
  methods: {
    async postInterest(prizeId) {
      const userToken = localStorage.getItem('userToken');

      if (!prizeId || !userToken) {
        this.$message.error(this.$t('message.unknow_error'));
        return;
      }

      try {
        const response = await postRequest('interest', {
          token: userToken,
          prizeId: prizeId
        });

        if (response.success) {
          this.$message.success(this.$t('messages.submit_success'));
        } else {
          this.$message.error(this.$t(response.message));
        }

        // 处理响应数据
      } catch (error) {
        console.error('POST request failed:', error);
        // 处理错误
        this.$message.error(this.$t('messages.can_not_change_wish'));
      }
    }
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  float: right;
  width: 100%;
}
</style>