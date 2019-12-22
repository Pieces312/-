<template>
  <div>
    <!-- <newSongLayout v-if='bg' height="150px"
      :bgImg="bg.pic"
      tipWord='根据你的音乐口味，为你推荐好音乐'></newSongLayout> -->
    <newSongLayout v-if="bg" height="150px"
      :bgImg="bg.pic"
      tipWord='根据你的音乐口味，为你推荐好音乐'
      maskColor="#fff"
      maskOpacity="60">
        <!-- 头部样式  -->
        <div slot="header">
          <div class="head">
            <div class="date">
              <span class="day">{{day}}</span>
              <span style="margin: 0 5px;"> / </span>
              <span class="month">{{month}}</span>
            </div>
            <div class="txt">每日歌曲推荐</div>
          </div>
        </div>

        <div>
          <div slot="cl-head">
            <div class="ct-head">
              <p> <i class="iconfont icon-bofang"></i> 播放全部</p>
              <span class="multiple">多选</span>
            </div>
          </div>

          <!-- 列表部分  -->
          <div slot="content">
            <div class="ct-songs">
              <commonSong v-for="item in songList" 
                :key="item.id"
                :songInfo='item'
                type="pictrue" />
            </div>
          </div>
        </div>
    </newSongLayout>

    <!-- 弹窗组件 -->
    <mptoast />
  </div>
  
</template>

<script>
import mptoast from 'mptoast'
import songLayout from '@/components/songLayout'
import newSongLayout from '@/components/newSongLayout'
import commonSong from '@/components/common-song'
import { getRandomItem } from '@/utils'

export default {
  components: {
    songLayout,
    newSongLayout,
    commonSong,
    mptoast
  },

  data () {
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    return {
      // 获取今天的日期
      day: day < 10 ? '0' + day : day,
      month: month < 10 ? '0' + month : month,
      imgUrls: [],
      bg: null,
      songList: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    }
  },

  onShow () {
    this.getBannerData()
    // this.getSongList()
  },

  methods: {
    getBannerData () {
      this.$fly.get('http://localhost:3000/banner?type=2').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.imgUrls = data.banners
          this.bg = getRandomItem(this.imgUrls)
        }
      })
    },

    // 获取每日推荐的歌曲
    getSongList () {
      this.$fly.get('http://localhost:3000/login/refresh').then(response => {
        console.log(response)
      })
      this.$fly.get('http://localhost:3000/recommend/songs').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.songList = data.data.dailySongs
        }
      }).catch(error => {
        let err = error.response.data
        if (err.code === 301) {
          wx.showModal({
            title: '需要登录，请先登录。',
            success: function (option) {
              if (option.confirm) {
                wx.navigateTo({url: '../login/login/main'})
              } else if (option.cancel) {
                // wx.navigateBack({
                //   delta: 1
                // })
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 头部日期部分
.head {
  position: absolute;
  bottom: 30px;
  
  .date {
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;

    .day {
      font-size: 32px;
    }
  }

  .txt {
    font-size: 15px;
    color: #fff;
    letter-spacing: 1px;
  }
}

// 列表部分
.ct-head {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 40px;

  p {
    font-weight: bold;

    .iconfont {
      font-weight: normal;
      margin-right: 5px;
    }
  }

  span {
    font-size: 13px;
  }
}

.ct-songs {
  margin-top: 10px;
}
</style>
