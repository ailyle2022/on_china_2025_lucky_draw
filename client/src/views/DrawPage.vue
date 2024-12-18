<template>
    <div class="common-layout">
        <el-row :gutter="20">
            <el-col :span="12">
                <DrawPrizeComponent :id="prize.id" :image="require(`@/assets/${prize.id}.jpg`)" :name="prize.name"
                    :level="prize.level" :quantity="prize.quantity" />
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<script>
import DrawPrizeComponent from '@/components/DrawPrizeComponent.vue';
import { getRequest } from '@/services/apiService.js';

export default {
    components: {
        DrawPrizeComponent
    },
    data() {
        return {
            prize: {
                id: 1,
                image: '',
                name: '',
                level: 0,
                quantity: 0
            }
        }
    },
    created() {
        this.fetchPrizeData(this.$route.params.id); // 使用 id 参数获取数据
    },
    methods: {
        async fetchPrizeData(id) {
            try {
                const response = await getRequest('prizes');

                const foundPrize = response.find(prize => prize.id === parseInt(id));
                if (foundPrize) {
                    this.prize = foundPrize;
                } else {
                    console.error('Prize with id', id, 'not found');
                    this.prize = {}; // 或者设置一个默认值
                }

                console.log(this.prize)

                // 处理响应数据
            } catch (error) {
                console.error('GET request failed:', error);
                // 处理错误
            }
        }
    }
}
</script>

<style scoped>
.common-layout {
    margin-top: 80px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>