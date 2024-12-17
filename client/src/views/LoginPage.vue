<template>
    <div class="login-container">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // 这里可以添加实际的登录逻辑
        if (this.username === 'admin' && this.password === 'admin') {
          localStorage.setItem('userToken', this.username);
          this.$router.push('/');
        } else {
          alert('用户名或密码错误');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  </style>