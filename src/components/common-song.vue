<template>
    <div class="common-song" :class="{'songNum': type === 'number'}">
        <div class="song-pic">
            <span class="num" v-if="type === 'number'">1</span>
            <img v-else src="http://p2.music.126.net/lRE0QHTUkA_DxlB14uzSqg==/109951164207703933.jpg?param=50y50" alt="">
        </div>
        <div class="song-info" :style="{'width': type === 'number' ? 'calc(100% - 90px)' : 'calc(100% - 100px)'}">
            <p class="song-name">Day Dreaming</p>
            <p>Jack & Jack - A Good Friend Is Me. hhhhhh</p>
        </div>
        <div class="song-handle">
            <i class="iconfont icon-bofang"></i>
            <i class="iconfont icon-gengduoxiao"></i>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'number'
    }
  }
}
</script>

<style lang="less" scoped>
.common-song {
    display: flex;
    align-items: center;

    .song-pic {
        width: 40px;
        height: 40px;
        text-align: center;

        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }

    .song-handle .iconfont {
        margin-left: 10px;
        font-size: 20px;
        color: #999;
    }

    .song-info {
        padding: 0 10px;
        width: calc(100% - 100px);

        p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 11px;
            color: #999;
        }
        
        .song-name {
            font-size: 15px;
            color: #333;
        }
    }

    // 歌曲以数字排列
    &.songNum {
        .song-pic {
            width: 25px;
        }
        .num {
            font-size: 15px;
            font-weight: 500;
            color: #777;
        }
    }
}
</style>