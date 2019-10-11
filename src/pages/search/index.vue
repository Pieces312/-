<template>
  <div class="search_wrap">
    <!-- 顶部导航栏搜索 -->
    <div class="top_search">
      <div class="search_box">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="searchWord"
               @input='searchResult(searchWord)'
               @confirm="toResult(searchWord || defaultKeyword.realkeyword)"
               :placeholder="defaultKeyword.showKeyword">
      </div>
      <div class="cancel">
        <span @click="back">取消</span>
        <i class="iconfont icon-geshou"></i>
      </div>
    </div>

    <!-- 热搜榜 -->
    <div class="search_hot">
      <div class="search_title">
        热搜榜
      </div>
      <div class="hot_list">
        <div class="hot_item" v-for="(item, index) in hotData" 
             :key="index"
             @click="toResult(item.searchWord)">
          <span class="number" :class="{'top': index < 3}">{{index+1}}</span>
          <div class="hot_content">
            <h2>
              {{item.searchWord}} 
              <img :style="{'width': item.iconType == 5 ? '12px' : '28px'}" class="icon" :src="item.iconUrl" />
            </h2>
            <p>{{item.content}}</p>
            <span class="clickCount">{{item.score}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search_result" v-if="searchWord">
      <div class="search_item search_current" @click="toResult(searchWord)">搜索 “{{searchWord}}”</div>
      <div class="search_item" v-for="(item, index) in songs" 
           :key='index'
           @click="toResult(item.keyword)">
        <i class="iconfont icon-sousuo"></i>
        <p>{{item.keyword}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      defaultKeyword: null,
      hotData: [],
      searchWord: '',
      songs: [],
      searchHistory: []
    }
  },

  onLoad (options) {
    this.defaultKeyword = JSON.parse(options.default)
  },

  onShow () {
    this.getHotData()
  },

  methods: {
    back () {
      wx.navigateBack({
        delta: 1
      })
    },

    // 获取热搜榜的数据
    getHotData () {
      this.$fly.get('http://localhost:3000/search/hot/detail').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.hotData = data.data
        }
      })
    },

    // 搜索歌曲
    searchResult (keyword) {
      if (!keyword) return

      this.$fly.get('http://localhost:3000/search/suggest?keywords=' + keyword + '&type=mobile').then(res => {
        let data = res.data.result
        this.songs = data.allMatch
      })
    },

    // 跳转到结果页面
    toResult (word) {
      // this.searchHistory.push(item.keyword)
      // let str = this.searchHistory.toString()
      // console.log(str)
      // wx.setStorageSync({
      //   key: 'history',
      //   data: str
      // })
      wx.navigateTo({url: '../searchResult/main?keywords=' + word})
    }
  }
}
</script>

<style lang="less" scoped>
@iconW: 25%;

.top_search {
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search_box {
    padding: 5px 10px;
    width: calc(100% - @iconW);
    line-height: 25px;
    font-size: 15px;
    color: #8f8d8d;
    overflow: hidden;
    background: #faf6f6;
    border-radius: 20px;

    .iconfont {
      margin-right: 5px;
      width: 20px;
      float: left;
    }

    input {
      padding-top: 2px;
      width: calc(100% - 30px);
      height: 100%;
      float: left;
      font-size: 13px;
      border: none;
    }
  }

  .cancel {
    padding-left: 12px;
    width: @iconW;
    line-height: 35px;

    span {
      font-size: 17px;
    }

    .iconfont {
      float: right;
      font-size: 20px;
    }
  }
}

// 搜索历史
.search_history {
  padding: 15px;

  .search_title {
    font-size: 13px;
    line-height: 35px;
    font-weight: bold;

    .iconfont {
      float: right;
      font-weight: normal;
      color: #999;
    }
  }

  .search_list {
    margin-top: 8px;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;

    .search_item {
      margin-right: 12px;
      padding: 5px 10px;
      display: inline-block;
      font-size: 13px;
      background: #faf6f6;
      border-radius: 20px;
    }
  }
}

// 热搜榜
.search_hot {
  padding: 15px;

  .search_title {
    font-size: 13px;
    font-weight: bold;
    line-height: 35px;
  }

  .hot_list {
    .hot_item {
      margin-top: 10px;
      display: flex;
      align-items: center;

      .number {
        width: 30px;
        font-size: 16px;
        color: #666;
        font-weight: bold;

        &.top {
          color: #ee3a23;
        }
      }

      .hot_content {
        padding-left: 5px;
        width: calc(100% - 40px);
        position: relative;

        .clickCount {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          font-size: 12px;
          color: #999;
        }

        h2 {
          font-size: 15px;
          font-weight: bold;

          .icon {
            width: 28px;
            height: 14px;
            vertical-align: -2px;
          }
        }

        p {
          width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: #666;
        }
      }
    }
  }
}

// 搜索结果
.search_result {
  width: 100%;
  height: calc(100vh - 50px);
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 9;
  overflow: scroll;
  background: #fff;

  .search_item {
    padding-left: 15px;
    display: flex;
    font-size: 13px;
    line-height: 40px;

    &.search_current {
      color: #6399c5;
      border-bottom: 1px solid #ddd;
    }

    .iconfont {
      width: 25px;
      font-size: 15px;
      color: #999;
    }

    p {
      width: calc(100% - 25px);
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
