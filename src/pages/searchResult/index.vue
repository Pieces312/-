<template>
  <Loading v-if='loading' />
  <div v-else class="result_wrap">
    <div class="result_title">单曲</div>
    <div class="songs_list">
        <div class="song_item" v-for="(item, index) in songs" :key="index">
          <div class="song_info">
            <p class="song_name">{{item.name}}</p>
            <p>{{item.artists[0].name}} {{item.album.name}}</p>
            <p v-if="item.alias.length">{{item.alias[0]}}</p>
          </div>
          <div class="song_handle">
            <i class="iconfont icon-gengduoxiao"></i>
          </div>
        </div>
    </div>

    <div class="playlist" v-if="playlist.length">
      <div class="result_title">歌单</div>
      <div class="play_item" v-for="(item, index) in playlist" :key="index" @click="toPlaylist(item)">
        <div class="play_pic"><img :src="item.coverImgUrl" alt=""></div>
        <div class="play_info">
          <p class="play_name">{{item.name}}</p>
          <p>{{item.trackCount}}首音乐  <span style="margin-left: 25px;">播放{{item.playCount}}次</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      songs: [],
      playlist: [],
      loading: false
    }
  },
  computed: {
    filterList () {
      this.playlist.forEach(item => {
        let count = item.playCount
        let _val = Math.floor(count / 10000)
        item.playCount = (count < 99999) ? count : _val + '万'
      })

      return this.songList
    }
  },

  onLoad (options) {
    this.loading = true
    this.$fly.get('http://localhost:3000/search/suggest?keywords=' + options.keywords).then(res => {
      let data = res.data.result
      this.songs = data.songs
      this.playlist = data.playlists
      this.loading = false
    })
  },

  methods: {
    // 点击进入歌单详情
    toPlaylist (item) {
      wx.navigateTo({url: '../playlist/main?id=' + item.id})
    }
  }
}
</script>

<style lang="less" scoped>
.result_wrap {
    padding: 0 15px;

    .result_title {
        font-size: 15px;
        line-height: 40px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }

    .song_item {
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;

      .song_info {
        width: calc(100% - 60px);

        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 12px;
          color: #999;

          &.song_name {
            font-size: 15px;
            color: #333;
          }
        }
      }

      .song_handle .iconfont {
        margin-left: 8px;
        font-size: 20px;
        color: #999;
      }
    }

    // 歌单
    .playlist {
      margin-top: 20px;

      .result_title {
        border-bottom: none;
      }
    }

    .play_item {
      margin: 12px 0;
      display: flex;
      align-items: center;

      .play_pic {
        width: 50px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }

      .play_info {
        padding-left: 10px;
        width: calc(100% - 50px);

        p {
          font-size: 12px;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          &.play_name {
            font-size: 15px;
            color: #333;
          }
        }
      }
    }
}
</style>