import { createI18n } from 'vue-i18n';

// 导入语言包
import zhCN from './zh-CN.json';
import enUS from './en-US.json';

const i18n = createI18n({
  locale: 'zh-CN', // 设置默认语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

export default i18n;