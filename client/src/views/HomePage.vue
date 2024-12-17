<template>
  <div class="home-container">
    <div>
      <CardComponent 
      :image="require('@/assets/1.jpg')" 
      title="1等奖 - iPhone 16 Pro Max 256GB 原色钛金属"/>

      <CardComponent 
      :image="require('@/assets/2.jpg')" 
      title="1等奖 - iPhone 16 Pro Max 256GB 原色钛金属"/>

      <CardComponent 
      :image="require('@/assets/3.jpg')" 
      title="1等奖 - iPhone 16 Pro Max 256GB 原色钛金属"/>

      <CardComponent 
      :image="require('@/assets/4.jpg')" 
      title="1等奖 - iPhone 16 Pro Max 256GB 原色钛金属"/>

    </div>

    <div style="padding-bottom: 40px; padding-top: 20px;">
      <el-button type="info" plain @click="logout">退出登录</el-button>
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
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center;
  height: 100vh;
  padding: 10px;
  text-align: center;
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

.el-card{
  margin-bottom: 20px;
}

.image {
  width: 100%;
  display: block;
}
</style>