<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-main style="width: 50wv;">
                    <CardComponent :id="prize.id" :image="require(`@/assets/${prize.id}.jpg`)" :name="prize.name"
                        :level="prize.level" :quantity="prize.quantity" />
                </el-main>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';

export default {
    components: {
        CardComponent
    },
    data() {
        return {
            prize: {
                id: 1, // 示例 ID
                name: 'Example Prize', // 示例名称
                level: 'Gold', // 示例等级
                quantity: 10 // 示例数量
            }
        }
    }
}
</script>

<style scoped>
.common-layout {
    margin-top: 80px;
}
</style>