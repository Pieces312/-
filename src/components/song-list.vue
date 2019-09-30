<template>
    <div class="song_list">
        <div class="song_item" v-for="item in filterList" :key="item.id">
            <div class="img">
                <span class="volume"> <i class="iconfont icon-z"></i> {{item.playCount}}</span>
                <img :src="item.picUrl" alt="">
            </div>
            <div class="song_name">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    songList: Array
  },
  computed: {
    filterList () {
      this.songList.forEach(item => {
        let count = item.playCount
        let _val = Math.floor(count / 10000)
        item.playCount = (count < 99999) ? count : _val + '万'
      })

      return this.songList
    }
  }
}
</script>

<style lang="less" scoped>
@itemW: 32%;

.song_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .song_item {
        margin-top: 10px;
        width: @itemW;

        .img {
            width: 100%;
            height: 110px;
            position: relative;
            overflow: hidden;
            border-radius: 6px;

            img {
                height: 100%;
            }

            span {
                position: absolute;
                top: 2px;
                right: 8px;
                color: #fff;
                font-size: 12px;

                .iconfont {
                    font-size: 12px;
                }
            }
        }

        .song_name {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 13px;
            color: #333;
        }
    }
}
</style>
