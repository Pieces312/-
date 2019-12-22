<template>
  <div class="audio">
    <img src="http://p3.music.126.net/FoHnnZ5ti8JMlsY-lXgVKg==/109951164444495391.jpg?param=200y200" alt="">
    <!-- <div class="circle"><span></span></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      circleList: [
        {dot: 4, x: 3, y: 10}
      ]
    }
  },

  onLoad () {
    console.log(this.randomCircle(3, 12))
  },

  methods: {
    // 随机生成点的半径 min～max之间
    randomCircle (min, max) {
      return Math.floor(Math.random(min, max) * 10)
    }
  }
}
</script>


<style lang="less" scoped>
.circle {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // border: 2px solid #F00;
  // border-radius: 50%;

  span {
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    border-radius: 50%;
  }
}
.audio {
  margin: -100px 0 0 -100px;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  text-align: center;
  border: 5px solid rgba(0, 0, 0, .1);
  border-radius: 50%;
  animation: Rotate 10s linear infinite both;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  audio {
    opacity: 0
  }

  .iconfont {
    position: relative;
    z-index: 9;
    font-size: 40px;
    color: #333;
  }
}

@keyframes Rotate {
  from {
    transform: rotateZ(0deg)
  }

  to {
    transform: rotateZ(360deg)
  }
}
</style>

