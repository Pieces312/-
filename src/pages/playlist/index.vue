<template>
  <div :class="{'over_hidden': showCover}">
    <songLayout v-if="playlist && !loadingModal" height="270px"
      :bgImg="playlist.coverImgUrl"
      :filter='12'
      maskColor="#fff"
      maskOpacity="60"
      :drop_down_animate='false'>
        <!-- 头部样式 -->
        <div slot="header">
          <div class="playlist">
            <div class="img"><img :src="playlist.coverImgUrl" alt=""></div>
            <div class="play_info">
              <p class="name">{{playlist.name}}</p>
              <div class="creator">
                <img :src="playlist.creator.avatarUrl" alt="">
                {{playlist.creator.nickname}}
                <i class="iconfont icon-icon--"></i>
              </div>
              <p class="play_desc" @click="showPlaycover">
                {{playlist.description}}
                <i class="iconfont icon-icon--"></i>
              </p>
            </div>
          </div>

          <div class="play_number">
            <div class="number_item">
              <i class="iconfont icon-xinxi-copy"></i>
              <p>{{playlist.commentCount}}</p>
            </div>
            <div class="number_item">
              <i class="iconfont icon-fenxiang"></i>
              <p>{{playlist.shareCount}}</p>
            </div>
            <div class="number_item">
              <i class="iconfont icon-xiazai"></i>
              <p>下载</p>
            </div>
            <div class="number_item">
              <i class="iconfont icon-xuanze-duoxuan-tianchong"></i>
              <p>多选</p>
            </div>
          </div>
        </div>

        <!-- 列表部分 -->
        <div slot="lc_head">
          <div class="ct-head">
            <p> <i class="iconfont icon-bofang"></i> 播放全部 <span class="total">(共{{playlist.trackCount}}首)</span></p>
            <span class="subscribe">+ 收藏({{playlist.subscribedCount}})</span>
          </div>
        </div>
        
        <div slot="content">
          <div class="ct-songs">
            <div class="song-item" 
                 v-for="(item, index) in playlist.tracks" 
                 :key="item.id"
                 @click="toSongDetail(item)">
              <div class="song-pic">
                <span class="num">{{index+1}}</span>
              </div>
              <div class="song-info">
                <p class="song-name">{{item.name}}</p>
                <p>{{item.ar[0].name}} - {{item.al.name}}</p>
              </div>
              <div class="song-handle">
                <i class="iconfont icon-bofang" v-if="item.mv !== 0"></i>
                <i class="iconfont icon-gengduoxiao"></i>
              </div>
            </div>
          </div>
        </div>

    </songLayout>
    <Loading v-if="loadingModal" />

    <!-- 点击描述显示歌单封面 -->
    <playcover v-if="playlist" 
              v-model="showCover" 
              :showCover="showCover"
              :coverInfo='playlist'
              @closeModal="closeModal" />
  </div>
  
</template>

<script>
import songLayout from '@/components/songLayout'
import commonSong from '@/components/common-song'
import Loading from '@/components/loading'
import playcover from './playcover'

export default {
  components: {
    songLayout,
    commonSong,
    Loading,
    playcover
  },

  data () {
    return {
      playlist: null,
      loadingModal: true,
      showCover: false
    }
  },

  onLoad (options) {
    this.$fly.get('http://localhost:3000/playlist/detail?id=' + options.id).then(res => {
      let data = res.data.playlist
      this.playlist = data
      this.loadingModal = false
    })
  },

  onUnload () {
    this.playlist = []
    this.loadingModal = true
  },

  methods: {
    showPlaycover () {
      this.showCover = true
    },

    closeModal (e) {
      this.showCover = e
    },

    // 到播放页面
    toSongDetail (item) {
      wx.navigateTo({url: '../songDetail/main?id=' + item.id})
    }
  }
}
</script>

<style lang="less" scoped>
.over_hidden {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: hidden;
}

// 头部日期部分
.playlist {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .img {
    width: 150px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .play_info {
    padding-left: 15px;
    width: calc(100% - 150px);
    color: #fff;

    .name {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 15px;
      font-weight: bold;
    }

    .creator {
      margin: 10px 0;
      font-size: 13px;
      line-height: 30px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .iconfont {
        font-size: 10px;
      }
    }

    .play_desc {
      padding-right: 20px;
      position: relative;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
      line-height: 1.5;

      .iconfont {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        font-size: 10px;
      }
    }
  }
}

.play_number {
  margin-top: 20px;
  display: flex;

  .number_item {
    width: 25%;
    text-align: center;
    color: #fff;
    font-size: 13px;

    .iconfont {
      font-size: 22px;
    }
  }
}

// 列表部分
.ct-head {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 30px;

  p {
    font-weight: bold;

    .total {
      font-size: 12px;
      font-weight: normal;
      color: #888;
    }

    .iconfont {
      font-weight: normal;
      margin-right: 5px;
    }
  }

  .subscribe {
    padding: 0 8px;
    font-size: 13px;
    color: #fff;
    background-color: #ee3a23;
    border-radius: 20px
  }
}

.ct-songs {
  margin-top: 10px;

  .song-item {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .song-pic {
      width: 20px;
      position: relative;
        
      .num {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          font-weight: 500;
          color: #777;
      }
    }

    .song-handle {
      width: 60px;
      text-align: right;

      .iconfont {
        margin-left: 10px;
        font-size: 20px;
        color: #999;
      }
    } 

    .song-info {
        padding: 0 10px 0 5px;
        width: calc(100% - 90px);

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
  }
}
</style>
