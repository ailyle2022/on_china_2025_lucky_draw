<template>
  <div class="login-container">
    <div class="login-title">
      <h2>{{ $t('login.title') }}</h2>
    </div>
    <el-form @submit.prevent="handleLogin" :model="loginForm" label-width="80px">
      <el-form-item label="Email">
        <el-input v-model="loginForm.username" placeholder="Please input your email"></el-input>
      </el-form-item>
      <el-form-item label="Cellphone">
        <el-input type="password" v-model="loginForm.password" placeholder="Please input last 4 digit of"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain native-type="submit">进入抽奖</el-button>
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
        this.$message.error('用户名或密码错误');
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
  height: 100vh;
  text-align: center;
}

.login-title {
  margin-bottom: 20px; /* 根据需要调整间距 */
}

.full-width-button {
  width: 100%;
}
</style>