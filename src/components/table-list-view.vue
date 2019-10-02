<template>
    <div class="table-list-view">
        <div class="table-list-item" v-for="item in tableList"
            :key="item.id"
            :class="{'bottom_bar': item.btmBar}">
            <i class="icon iconfont" :class='[item.icon]'></i>
            <div class="title">
                {{item.title}}
                <i class="iconfont icon-icon--"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    tableList: Array
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/reset.less";

.table-list-view {
    .table-list-item {
        display: flex;
        font-size: 13px;
        line-height: 45px;
        color: #444;

        &.bottom_bar {
            .bottom_bar();
        }

        .icon {
            width: 35px;
            font-size: 18px;
        }

        .title {
            width: calc(100% - 35px);
            border-bottom: 1px solid #f1f1f1;

            .iconfont {
                float: right;
                font-size: 12px;
            }
        }

        &:last-child {
            .title {
                border-bottom: none;
            }
        }
    }
}
</style>


