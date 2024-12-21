<template>
  <div class="home-container">


    <div style="padding-bottom: 40px; padding-top: 20px; width: 200px;">
      <button class="on-button-elem size-large bgcolor-white" type="info" plain @click="navTo('DrawList')" round>{{
        $t('button.go_to_draw') }}</button>
    </div>

    <div style="padding-bottom: 40px; padding-top: 20px; width: 200px;">
      <button class="on-button-elem size-large bgcolor-white" type="info" plain @click="navTo('Home')" round>{{
        $t('button.go_to_vote') }}</button>
    </div>

    <div style="padding-bottom: 40px; padding-top: 20px; width: 200px;">
      <button class="on-button-elem size-large bgcolor-black" plain @click="logout" round>{{ $t('login.exit')
        }}</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    },
   navTo(name) {
      this.$router.push({ name: name });
    },
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  text-align: center;
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