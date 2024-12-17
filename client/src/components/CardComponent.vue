<!-- src/components/CardComponent.vue -->
<template>
    <el-card :body-style="{ padding: '0px' }">
      <img
        :src="image"
        class="image"
      />
      <div style="padding: 14px">
        <span>{{ title }}</span>
        <div class="bottom">
          <el-button class="button">我想要这个奖品</el-button>
        </div>
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    props: {
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        
      };
    }
  };
  </script>
  
  <style scoped>
  .image {
    width: 100%;
    display: block;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    float: right;
    width: 100%;
  }

  </style>