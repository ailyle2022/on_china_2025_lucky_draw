<!-- src/components/CardComponent.vue -->
<template>
  <el-row :gutter="20" type="flex" align="middle" justify="center">
    <el-col :span="10">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="image" class="image" />
      </el-card>
    </el-col>
    <el-col :span="10">
      <h2>{{ level }}等奖 - {{ name }}</h2>
      <div>{{ winner }}</div>
      <el-button class="button" type="primary" @click="draw(id)">开始抽奖</el-button>
      <el-button class="button" type="danger" @click="reset(id)">重制</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { postRequest } from '@/services/apiService.js';

export default {
  props: {
    id: {
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
      isAdmin: false,
      winner: ""
    };
  },
  methods: {
    async draw(prizeId) {
      this.winner = "";
      const userToken = localStorage.getItem('userToken');

      if (!prizeId || !userToken) {
        this.$message.error(this.$t('message.unknow_error'));
        return;
      }

      try {
        const response = await postRequest('draw', {
          token: userToken,
          prizeId: prizeId
        });

        if (response.success) {
          this.winner = response.data.winner;
        } else {
          this.$message.error(this.$t(response.message));
        }

        // 处理响应数据
      } catch (error) {
        console.error('POST request failed:', error);
        // 处理错误
        this.$message.error(this.$t('messages.unknow_error'));
      }
    },
    async reset(prizeId) {
      this.winner = "";
      const userToken = localStorage.getItem('userToken');

      if (!prizeId || !userToken) {
        this.$message.error(this.$t('message.unknow_error'));
        return;
      }

      try {
        const response = await postRequest('reset', {
          token: userToken,
          prizeId: prizeId
        });

        if (response.success) {
          this.$message.success("reset success");
        } else {
          this.$message.error("reset failed");
        }

        // 处理响应数据
      } catch (error) {
        console.error('POST request failed:', error);
        // 处理错误
        this.$message.error(this.$t('messages.unknow_error'));
      }
    }
  },
  mounted() {
    this.isAdmin = localStorage.getItem('isAdmin');
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.button {
  margin-top: 20px;
  width: 100px;
}
</style>