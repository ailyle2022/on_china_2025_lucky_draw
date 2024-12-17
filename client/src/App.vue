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
</style>
