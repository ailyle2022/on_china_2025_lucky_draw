<template>
  <div class="login-container">
    
    <div v-if="result.length > 0">
      <div v-for="(item, index) in result" :key="index">
        <div v-if="item && item.vote !== undefined && item.count !== undefined">
          <h2>{{ item.vote }}: </h2>
          <div class="black-square" :style="{ width: item.count * 20 + 'px' }"></div>
        </div>
      </div>
    </div>
  
    <div style="width: 300px;">
      <button style="margin-top: 50px;" class="on-button-elem size-large bgcolor-white" type="info" plain
        @click="goToHomePage()" round>{{
          $t('button.go_to_home') }}</button>
    </div>
  </div>
</template>

<script>
import { getRequest } from '@/services/apiService';

export default {
  data() {
    return {
      timer: null,
      result: []
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'Home' });
    },
    async fetchVoteResult() {
      try {
        const response = await getRequest('voteResult');
        if (response) {
          this.result = response;
        } else {
          this.$message.error(this.$t('message.unknow_error'));
        }
        // 处理响应数据
      } catch (error) {
        // 处理错误
        this.$message.error(this.$t('message.unknow_error'));
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.fetchVoteResult();
    }, 500);
  },
  beforeUnmount() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.black-square {
  height: 20px;
  background-color: black;
  margin-top: 20px; /* 根据需要调整间距 */
}
.login-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  text-align: center;
}

.login-title {
  margin-bottom: 20px;
  /* 根据需要调整间距 */
}

.full-width-button {
  width: 100%;
}

.height {
  height: 48px !important;
}
</style>