<template>
  <div class="login_wrap">
    <i class="close" @click="goBack">×</i>

    <div class="logo">
      <div class="animate_circle"></div>
      <div class="icon">
        <i class="iconfont icon-yanchu"></i>
      </div>
    </div>

    <div class="btn-group">
      <button class="login" @click="toLogin">手机号登录</button>
      <p>同意 <span>《服务条款》</span>和<span>《隐私政策》</span></p>
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
  },

  methods: {
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    },

    toLogin () {
      wx.navigateTo({url: 'login'})
    }
  }
}
</script>

<style lang="less" scoped>
.login_wrap {
  height: 100vh;
  background: #df2c14;

  .close {
    position: fixed;
    top: 15px;
    left: 15px;
    font-size: 30px;
    color: #fff;
  }

  .logo {
    width: 100%;
    height: 400px;
    position: relative;

    // logo样式
    .icon {
      width: 65px;
      height: 65px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 5;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 65px;
      background: #ee3a23;
      border-radius: 50%;

      .iconfont {
        font-size: 38px;
        color: #fff;
        font-weight: bold;
      }
    }

    // 圆圈动画效果
    .animate_circle {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      &::before,
      &::after {
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: '';
        border: 1px solid #ee3a23;
        border-radius: 50%;
      }

      &::before {
        animation: fadeOut 8s ease infinite;
      }

      &::after {
        animation: fadeOut 8s ease 4s infinite;
      }
    }
  }

  .btn-group {
    width: 100%;
    position: fixed;
    bottom: 80px;
    left: 0;
    text-align: center;
    color: #f89d9d;

    button {
      margin: 0 auto 15px;
      width: 75%;
      font-size: 15px;
      color: #ee3a23;
      background-color: #fff;
      border-radius: 20px;
    }

    span {
      color: #fff;
    }
  }
}

@keyframes fadeOut {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
</style>

