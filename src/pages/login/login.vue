<template>
  <div class="login_wrap">
    <div class="form">
      <p>未注册手机号登录后将自动创建账号</p>
      <div class="input_row">
        <label>+86</label>
        <input type="text" placeholder="输入手机号" />
      </div>
      <button class="next">下一步</button>
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
    }
  }
}
</script>

<style lang="less" scoped>
.login_wrap {
  .form {
    margin-top: 20px;
    padding: 0 15px;
  }
}
</style>

