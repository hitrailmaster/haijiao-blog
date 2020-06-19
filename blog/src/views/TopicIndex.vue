<template>
    <div class="index">
        <Sider />
        <topic-page />
        <rank-index />
    </div>
</template>
<script>
import Sider from './Sider'
import TopicPage from './TopicPage'
import RankIndex from './RankIndex'
export default {
    components: {
        Sider,
        TopicPage,
        RankIndex
    }
}
</script>
<style lang="scss" scoped>
.index {
    display: flex;
}
</style>