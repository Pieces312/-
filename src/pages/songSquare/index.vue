<template>
  <div class="songSquare_wrap">

    <!-- 歌单轮播 -->
    <div class="swiper">
      <swiper v-if="imgUrls.length > 0" 
        previous-margin="110px" 
        next-margin="110px" 
        circular 
        @change="changeSwiper">
        <block v-for="(item, index) in imgUrls" :key="index" >
          <swiper-item>
            <div class="song_item" :class="{'current': active == index}">
              <div class="pic">
                <image :src="item"></image>
                <div class="play">
                  <i class="iconfont icon-bofang2"></i>
                </div>
              </div>
              <div class="desc">国庆颂歌 | 音乐和祖国同在</div>
            </div>
          </swiper-item>
        </block>
      </swiper>
      <swiper v-else previous-margin="110px" next-margin="110px">
        <block>
          <swiper-item>
            <div class="song_item current" style="width: 150px">
              <div class="pic">
                <image src="http://img1.imgtn.bdimg.com/it/u=1027404258,1685705977&fm=26&gp=0.jpg"></image>
                <div class="play">
                  <i class="iconfont icon-bofang2"></i>
                </div>
              </div>
              <div class="desc">网易好音乐</div>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!-- 歌单列表 -->
    <div class="songs_list">
      <songList :songList='songsList' @clickHandle="toPlaylist" />
    </div>
  </div>
</template>

<script>
import songList from '@/components/song-list'

export default {
  components: {
    songList
  },
  data () {
    return {
      active: 0,
      imgUrls: [],

      songsList: []
    }
  },

  onShow () {
    this.getRecommendData()
  },

  methods: {
    changeSwiper (e) {
      let cur = e.target.current
      this.active = cur
    },

    // 获取推荐歌单数据
    getRecommendData () {
      this.$fly.get('http://localhost:3000/personalized').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.songsList = data.result
        }
      })
    },

    // 点击进入歌单详情
    toPlaylist (item) {
      wx.navigateTo({url: '../playlist/main?id=' + item.id})
    }
  }
}
</script>

<style lang="less" scoped>
.songSquare_wrap {
  .swiper {
    padding: 0 6px;
    margin: 15px 0;

    swiper {
      height: 200px;
    }
  }

  swiper-item {
    display: flex;
    align-items: center;
    overflow: visible;

    .song_item {
      opacity: .5;
      transform: scale(.9);
      transition: all ease .8s;
      overflow: hidden;
      box-shadow: 0 0 8px rgba(0,0,0,.1);
      border-radius: 4px;

      &.current {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .pic {
    height: 135px;
    position: relative;

    image {
      width: 100%;
      height: 100%;
    }

    .play {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 5px;
      bottom: 5px;
      text-align: center;
      line-height: 40px;
      background: rgba(255,255,255,.7);
      border-radius: 50%;

      .iconfont {
        margin-left: 3px;
        font-size: 18px;
        color: #ee3a23;
      }
    }
  }

  .desc {
    padding: 4px 8px;
    height: 45px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.songs_list {
  padding: 0 15px;
}
</style>
