<!-- src/App.vue -->
<template>
  <div class="language-switcher">
    <div class="left">{{ $t('login.title') }}</div>
    <div class="right">
      <a href="#" @click.prevent="changeLanguage('zh-CN')">中文</a> |
      <a href="#" @click.prevent="changeLanguage('en-US')">EN</a>
    </div>
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

    document.title = `On 2025 Annual Party`;

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
  right: 0;
  left: 0;
  width: 100%;     /* 占据整个宽度 */
  height: 60px;
  line-height: 60px;
  background-color: #000; /* 背景颜色，根据需要调整 */
  color: #fff;
  z-index: 1000;   /* 确保在其他内容之上 */
  display: flex;   /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 左右对齐 */
  padding: 0 20px; /* 添加一些内边距，根据需要调整 */
}

.language-switcher .left {
  text-align: left; 
  width: 50%;
}

.language-switcher .right {
  text-align: right; /* 右对齐 */
  margin-right: 40px;
  width: 50%;
}

.language-switcher a {
  color: #fff;     /* 超链接颜色 */
  text-decoration: none; /* 去掉下划线，根据需要调整 */
}

.language-switcher a:hover {
  color: #ccc;     /* 超链接悬停颜色，根据需要调整 */
}

.on-button-elem {
  border-radius: 24px;
  height: 48px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  left: 0rpx;
  top: 0rpx;
  font-size: 28rpx;
  width: 100%;
  flex: 6;
  -webkit-tap-highlight-color: transparent;
  &.disabled {
    background-color: #ccc !important;
    border: #ccc !important;
    color: #fff !important;
  }
  &.bgcolor-block {
    border: 2rpx solid #000;
    background-color: #000;
    color: #fff;
  }
  &.bgcolor-white {
    border: 2rpx solid #fff;
    background-color: #fff;
    color: #000;
  }
  &.bgcolor-white-hollow {
    border: 2rpx solid #000;
    background-color: #fff;
    color: #000;
  }
  &.bgcolor-transparent {
    border: 2rpx solid transparent;
    background-color: transparent;
    color: #000;
  }
}
</style>