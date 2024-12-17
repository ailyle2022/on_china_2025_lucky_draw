<template>
  <div class="login-container">
    <div class="login-title">
    </div>
    <el-form @submit.prevent="handleLogin" :model="loginForm" style="width: 60%;">
      <el-form-item>
        <el-input v-model="loginForm.username" :placeholder="$t('login.email')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" :placeholder="$t('login.cellphone')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="full-width-button" type="primary" plain native-type="submit">{{$t('login.enter')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      // 这里可以添加实际的登录逻辑
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin') {
        localStorage.setItem('userToken', this.loginForm.username);
        this.$router.push('/');
      } else {
        this.$message.error(this.$t('messages.authorization_error'));
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
</style>