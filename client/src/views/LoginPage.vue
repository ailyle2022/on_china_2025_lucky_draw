<template>
  <div class="login-container">
    <div class="login-title">
    </div>
    <el-form @submit.prevent="handleLogin" :model="loginForm" style="width: 80%;">
      <el-form-item>
        <el-input class="height" v-model="loginForm.email" :placeholder="$t('login.email')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="height" type="password" v-model="loginForm.cellphone" :placeholder="$t('login.cellphone')"></el-input>
      </el-form-item>
      <el-form-item>
        <button class="on-button-elem size-large bgcolor-block" type="primary" plain native-type="submit" round>{{$t('login.enter')}}</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postRequest } from '@/services/apiService';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        cellphone: ''
      }
    };
  },
  methods: {
    async handleLogin() {
       if (this.loginForm.email === "" || this.loginForm.cellphone === ""){
        this.$message.error(this.$t('messages.login_failed'));
        return;
       }

       try {
        const response = await postRequest('login', {
          email: this.loginForm.email,
          cellphone: this.loginForm.cellphone
        });

        if (response.success){
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
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  text-align: center;
}

.login-title {
  margin-bottom: 20px; /* 根据需要调整间距 */
}

.full-width-button {
  width: 100%;
}

.height{
  height: 48px !important;
}
</style>