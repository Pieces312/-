<template>
  <div class="home_wrap">
    <!-- 顶部导航栏搜索 -->
    <div class="top_search">
      <div class="icon"><i class="iconfont icon-luyin"></i></div>
      <div class="search_box" @click="toSeach">
        <i class="iconfont icon-sousuo"></i>{{searchDefault}}
      </div>
    </div>

    <!-- 音乐轮播 -->
    <div class="swiper_box">
      <swiper v-if="imgUrls.length > 0" autoplay circular indidator-dots indicator-active-color="#ee3a23">
        <block v-for="(item, index) in imgUrls" :key="index" >
          <swiper-item>
            <image :src="item.pic" mode="scaleToFill"></image>
            <span class="tag" :style="{'background-color': item.titleColor}">{{item.typeTitle}}</span>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!-- 分类 -->
    <div class="grid_type">
      <div class="grid_item">
        <div class="icon">
          <i class="iconfont icon-icon-"></i>
        </div>
        <div class="name">每日推荐</div>
      </div>
      <div class="grid_item">
        <div class="icon">
          <i class="iconfont icon-gedan"></i>
        </div>
        <div class="name">歌单</div>
      </div>
      <div class="grid_item">
        <div class="icon">
          <i class="iconfont icon-paixingbang"></i>
        </div>
        <div class="name">排行榜</div>
      </div>
      <div class="grid_item">
        <div class="icon">
          <i class="iconfont icon-xianxing_diantai"></i>
        </div>
        <div class="name">电台</div>
      </div>
    </div>

    <!-- 推荐歌单 -->
    <songType :songtitle="'推荐歌单'" :tagname="'歌单广场'">
      <songList :songList='recommendData' />
    </songType>

    <!-- 新碟 -->
    <!-- <songType :songtitle="'新碟 | 新歌'" :tagname="'更多新碟'">
      <songList :songList='[]' /> 
    </songType>-->
    
  </div>
</template>

<script>
import songType from '@/components/song-type'
import songList from '@/components/song-list'

export default {
  data () {
    return {
      searchDefault: '',
      imgUrls: [],
      recommendData: []
    }
  },

  components: {
    songType,
    songList
  },

  created () {
    this.getDefaultkeyword()
    this.getBannerData()
    this.getRecommendData()
  },

  methods: {
    // 获取默认搜索关键词
    getDefaultkeyword () {
      this.$fly.get('http://localhost:3000/search/default').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.searchDefault = data.data.showKeyword
        }
      })
    },

    // 跳转搜索页面
    toSeach () {
      wx.navigateTo({url: '../search/main?default=' + this.searchDefault})
    },

    // 获取音乐轮播数据
    getBannerData () {
      this.$fly.get('http://localhost:3000/banner?type=2').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.imgUrls = data.banners
        }
      })
    },

    // 获取推荐歌单数据
    getRecommendData () {
      this.$fly.get('http://localhost:3000/personalized?limit=6').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.recommendData = data.result
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@iconW: 10%;

.top_search {
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    width: @iconW;

    .iconfont {
      font-size: 22px;
    }
  }

  .search_box {
    width: calc(100% - @iconW);
    line-height: 35px;
    font-size: 15px;
    text-align: center;
    color: #8f8d8d;
    background: #faf6f6;
    border-radius: 20px;

    .iconfont {
      margin-right: 5px;
    }
  }
}

// 音乐轮播
.swiper_box {
  padding: 8px 15px;

  swiper-item {
    position: relative;
    border-radius: 6px;
    
    image {
      width: 100%;
      height: 100%;
    }

    .tag {
      padding: 2px 5px;
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 12px;
      color: #fff;
      border-top-left-radius: 8px;
    }
  }
  
}

// 分类
.grid_type {
  padding: 12px 15px;
  display: flex;
  border-bottom: 1px solid #eee;

  .grid_item {
    width: 25%;
    font-size: 12px;
    color: #666;
    text-align: center;

    &:active {
      opacity: .8;
    }

    .icon {
      margin: 0 auto 5px;
      width: 45px;
      height: 45px;
      background: #ee3a23;
      border-radius: 50%;

      .iconfont {
        font-size: 22px;
        line-height: 45px;
        color: #fff;
      }
    }
  }
}
</style>