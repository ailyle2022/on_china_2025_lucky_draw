<!-- src/components/CardComponent.vue -->
<template>
    <el-card :body-style="{ padding: '0px' }">
      <img
        :src="image"
        class="image"
      />
      <div style="padding: 14px">
        <span>{{ level }}等奖 - {{ name }} x {{ quantity }}</span>
        <div class="bottom">
          <el-button class="button">{{$t('home.want_this_prize')}}</el-button>
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
      name: {
        type: String,
        required: true
      },
      level: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
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