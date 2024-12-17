<template>
  <div class="language-switcher">
      <a href="#" @click.prevent="changeLanguage('zh-CN')">中文</a> |
      <a href="#" @click.prevent="changeLanguage('en-US')">EN</a>
    </div>
  <router-view></router-view>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  setup() {
    const { locale } = useI18n();

    const changeLanguage = (lang) => {
      locale.value = lang;
    };

    return {
      changeLanguage
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.language-switcher {
  position: fixed; /* 固定位置 */
  top: 0;          /* 固定在顶部 */
  width: 100%;     /* 占据整个宽度 */
  height: 60px;
  line-height: 60px;
  background-color: #fff; /* 背景颜色，根据需要调整 */
  z-index: 1000;   /* 确保在其他内容之上 */
}
</style>
