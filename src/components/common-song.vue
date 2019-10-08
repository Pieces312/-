<template>
    <div class="common-song" :class="{'songNum': type === 'number'}">
        <div class="song-pic">
            <span class="num" v-if="type === 'number'">10</span>
            <img v-else :src="songInfo.artists.picUrl" alt="">
        </div>
        <div class="song-info" :style="{'width': type === 'number' ? 'calc(100% - 90px)' : 'calc(100% - 100px)'}">
            <p class="song-name">{{songInfo.name}}</p>
            <p>{{songInfo.artists.name}} {{songInfo.album.name}}</p>
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
    },
    songInfo: Object
  }
}
</script>

<style lang="less" scoped>
.common-song {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .song-pic {
        width: 40px;
        height: 40px;

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
            position: relative;
        }
        .num {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 15px;
            font-weight: 500;
            color: #777;
        }
    }
}
</style>