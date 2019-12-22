<template>
  <!-- <Audio /> -->
  <div class="detail_wrap">
    <div class="bg">
      <img :src="songpic" alt="">
    </div>
    <div class="header">
      <i class="iconfont icon-icon--" @click="back"></i>
      <h2>
        {{songname}}
        <span class="creator">{{songers}} <i class="iconfont icon-icon--"></i></span>
      </h2>
      <!-- <i class="iconfont icon-fenxiang"></i> -->
    </div>
    <div class="detail_content">
      <img :class="{'rotate': isPlay}" :src="songpic" alt="">
    </div>
    <div class="footer">
      <div class="song-icons">
        <div class="icon-item"><i class="iconfont icon-xin"></i></div>
        <div class="icon-item"><i class="iconfont icon-xiazai"></i></div>
        <div class="icon-item"><i class="iconfont icon-yanchu"></i></div>
        <div class="icon-item"><i class="iconfont icon-xinxi-copy"></i></div>
        <div class="icon-item"><i class="iconfont icon-gengduoxiao"></i></div>
      </div>

      <!-- 歌曲播放进度 -->
      <div class="song-process">
        <span>00.00</span>
        <div class="line">
          <span class="dot" :class="{'waiting': iswait}"></span>
        </div>
        <span>03:34</span>
      </div>

      <!-- 控制按钮 -->
      <div class="controls">
        <div class="icon-item"><i class="iconfont icon-shoucang"></i></div>
        <div class="icon-item"><i class="iconfont icon-yduishangyiqu"></i></div>
        <div class="icon-item">
          <i v-if="!isPlay" class="iconfont icon-bofang" @click="playMusicBtn"></i>
          <i v-else class="iconfont icon-zanting" @click="pauseMusic"></i>
        </div>
        <div class="icon-item"><i class="iconfont icon-yduixiayiqu"></i></div>
        <div class="icon-item"><i class="iconfont icon-dingdan"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from '@/components/audio'

export default {
  components: {
    Audio
  },

  data () {
    return {
      bgMusic: null,
      songDetail: null,

      songpic: '',
      songname: '',
      songers: '',
      songUrl: '',

      isPlay: false,
      iswait: false
    }
  },

  onLoad (options) {
    const that = this
    that.bgMusic = wx.getBackgroundAudioManager()

    // 获取歌曲详情
    that.$fly.get('http://localhost:3000/song/detail?ids=' + options.id).then(res => {
      let songs = res.data.songs[0]
      that.songname = songs.name
      that.songpic = songs.al.picUrl
      that.songers = songs.ar.map(item => item.name).toString()
      that.getSongurl(options.id)
    })
    that.bgMusic.onWaiting(function (res) {
      // console.log(res)
      that.iswait = true
    })
    that.bgMusic.onPlay(function () {
      // console.log('play')
      that.iswait = false
    })
  },

  methods: {
    // 获取歌曲链接
    getSongurl (id) {
      this.$fly.get('http://localhost:3000/song/url?id=' + id).then(res => {
        let data = res.data.data[0]
        this.songUrl = data.url

        this.bgMusic.title = this.songname
        if (data.url) {
          this.bgMusic.src = data.url
          this.isPlay = true
          this.bgMusic.play()
        } else {
          wx.showModal({
            title: '',
            content: '此歌曲暂时无法播放～',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              this.back()
              if (result.confirm) {
              }
            }
          })
        }
      })
    },

    // 播放按钮点击事件
    playMusicBtn () {
      const that = this
      let stoptime = wx.getStorageSync('stopTime')

      that.bgMusic.title = that.songname
      that.bgMusic.src = that.songUrl
      // 如果有值，则从stoptime位置开始播放音乐
      if (stoptime) {
        that.bgMusic.seek(stoptime)
      }
      that.isPlay = true
      that.bgMusic.play()
    },

    // 点击暂停
    pauseMusic () {
      this.isPlay = false
      this.bgMusic.pause()
      wx.setStorageSync('stopTime', this.bgMusic.currentTime)
    },

    back () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail_wrap {
  height: 100vh;
  overflow: hidden;
  color: #fff;

  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
      filter: blur(40px);
    }
  }

  .header {
    padding: 8px 20px;
    width: 100%;
    position: fixed;
    top: 20px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .iconfont {
      width: 30px;
      font-size: 20px;
    }

    h2 {
      width: calc(100% - 60px);
      text-align: center;
      font-size: 15px;

      span {
        margin-top: -5px;
        display: block;
        font-size: 12px;

        .iconfont {
          width: auto;
          font-size: 8px;
        }
      }
    }
  }

  // 歌曲图片
  .detail_content {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);

    img {
      margin-left: -32.5%;
      width: 65%;
      position: absolute;
      top: 22%;
      left: 50%;
      border-radius: 50%;
      border: 5px solid rgba(255,255,255,.1);

      &.rotate {
        animation: Rotate 10s linear infinite both;
      }
    }
  }

  // 歌曲操作
  .footer {
    position: fixed;
    right: 0;
    bottom: 15px;
    left: 0;

    .song-icons {
      display: flex;
      align-content: space-between;

      .icon-item {
        width: 20%;
        text-align: center;

        .iconfont {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    // 歌曲播放进度
    .song-process {
      margin-top: 15px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        width: 30px;
        text-align: center;
        font-size: 8px;
        color: #fff;
      }

      .line {
        width: calc(100% - 65px);
        height: 2px;
        position: relative;
        background: rgba(255,255,255,.2);

        .dot {
          width: 8px;
          height: 8px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 50%;

          &.waiting {
            animation: waiting 1.5s linear infinite alternate-reverse;
          }
        }
      }
    }

    // 歌曲控制按钮
    .controls {
      display: flex;
      align-items: center;

      .icon-item {
        width: 20%;
        text-align: center;

        .iconfont {
          font-size: 30px;
          color: #fff;
        }

        &:nth-child(3) {
          .iconfont {
            font-size: 50px;
          }
        }
      }
    }
  }
}

// 旋转动画
@keyframes Rotate {
  from {
    transform: rotateZ(0deg)
  }

  to {
    transform: rotateZ(360deg)
  }
}

// 音乐换充时动画
@keyframes waiting {
  from {
    background: #f00;
  }

  to {
    background: #fff;
  }
}
</style>