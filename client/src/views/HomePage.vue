<template>
  <div class="home-container">
    <h1>欢迎来到主页</h1>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
</style>