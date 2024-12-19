<template>
  <div class="home-container">
    <el-row :gutter="10">
      <CardComponent v-for="(prize, index) in prizes" :key="index" :id="prize.id"
        :image="require(`@/assets/${prize.id}.jpg`)" :name="prize.name" :level="prize.level"
        :quantity="prize.quantity" />
    </el-row>

    <div style="padding-bottom: 40px; padding-top: 20px; width: 200px;">
      <button class="on-button-elem size-large bgcolor-white" type="info" plain @click="logout"
        round>{{ $t('login.exit') }}</button>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';
import { getRequest } from '@/services/apiService.js';

export default {
  components: {
    CardComponent
  },
  data() {
    return {
      prizes: []
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    },
    async getPrizes() {
      try {
        const response = await getRequest('prizes');
        this.prizes = response;
        console.log('GET request successful:', response);
        // 处理响应数据
      } catch (error) {
        console.error('GET request failed:', error);
        // 处理错误
      }
    }
  },
  mounted() {
    this.getPrizes();
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  align-items: center;
  height: calc(100vh - 60px);
  padding: 10px;
  text-align: center;
  margin-top: 60px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  width: 100%;
  padding: 0;
  min-height: auto;
}

.el-card {
  margin-bottom: 20px;
}

.image {
  width: 100%;
  display: block;
}
</style>