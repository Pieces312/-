<template>
  <div class="listen_wrap">
    <div class="circle">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <div class="listening">
      <i class="iconfont icon-luyin"></i>
    </div>
    <div class="prompt">
      <h2>正在识别音乐... (15S)</h2>
      <p>点击停止识别</p>
    </div>
    <div class="tips">
      现在可以识别其他App里的歌曲哦~
      <span class="close">×</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
    }
  },

  created () {
  }
}
</script>

<style lang='less' scoped>
.listen_wrap {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #1a1919;

  .circle {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .circle1,
    .circle2 {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      background: #ee3a23;
      border-radius: 50%;
    }

    .circle1 {
      animation: narrow 3s ease infinite;
    }

    .circle2 {
      animation: narrow 3s ease 1.5s infinite;
    }
  }

  .listening {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #ee3a23;
    border-radius: 50%;

    .iconfont {
      line-height: 100px;
      font-size: 50px;
      color: #fff;
    }
  }

  .prompt {
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    text-align: center;
    color: #535151;

    h2 {
      font-size: 16px;
      color: #8f8c8c;
    }
  }

  .tips {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    line-height: 35px;
    color: #b9b8b8;
    border-top: 1px solid #363434;

    .close {
      float: right;
      font-size: 22px;
    }
  }
}

@keyframes narrow {
  0% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
}
</style>
