<template>
  <div class="detail_wrap">
    <div class="header">
      <i class="iconfont icon-icon--"></i>
      <h2>
        10,000 Hours 
        <span class="creator">Dan + Shay/Justin Bieber <i class="iconfont icon-icon--"></i></span>
      </h2>
      <i class="iconfont icon-fenxiang"></i>
    </div>
    <div class="detail_content">
      <img src="https://p1.music.126.net/RF7mNeqneGi9EBGo4uqUvA==/59373627916982.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songDetail: null
    }
  },

  onLoad (options) {
    this.$fly.get('http://localhost:3000/song/detail?ids=' + options.id).then(res => {
      let data = res.data.songs
      this.songDetail = data[0]
    })
  }
}
</script>

<style lang="less" scoped>
.detail_wrap {
  height: 100vh;
  overflow: hidden;
  color: #fff;

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

  .detail_content {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);

    img {
      width: 65%;
      position: absolute;
      top: 22%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 5px solid rgba(255,255,255,.3);
    }
  }
}
</style>