<template>
  <div class="login-container">
    <div class="login-title">
    </div>
    <div style="width: 300px;">
      <el-select v-model="value" filterable placeholder="Select" style="width: '300px'">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <button style="margin-top: 20px;" class="on-button-elem size-large bgcolor-block" type="primary" plain
        @click="handleVote()" round>{{
          $t('button.submit') }}</button>
    </div>
  </div>
</template>

<script>
import { postRequest, getRequest } from '@/services/apiService';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        cellphone: ''
      },
      value: '',
      options: []
    };
  },
  methods: {
    async handleLogin() {
      if (this.loginForm.email === "" || this.loginForm.cellphone === "") {
        this.$message.error(this.$t('message.login_failed'));
        return;
      }

      try {
        const response = await postRequest('login', {
          email: this.loginForm.email,
          cellphone: this.loginForm.cellphone
        });

        if (response.success) {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('isAdmin', response.data.isAdmin);
          this.$router.push('/');
        }

        // 处理响应数据
      } catch (error) {
        console.error('POST request failed:', error);
        // 处理错误
        this.$message.error(this.$t('message.login_failed'));
      }
    },
    async handleVote() {
      console.log(this.value)
    },
    async fetchNameList() {
      try {
        const response = await getRequest('nameList');
        if (response) {
          for (var i = 0; i < response.length; i++) {
            this.options.push({
              value: response[i].name,
              label: response[i].name
            });
          }
        } else {
          this.$message.error(this.$t('message.unknow_error'));
        }
        // 处理响应数据
      } catch (error) {
        console.error('GET request failed:', error);
        // 处理错误
        this.$message.error(this.$t('message.unknow_error'));
      }
    }
  },
  mounted() {
    this.fetchNameList();
  }
};
</script>

<style scoped>
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