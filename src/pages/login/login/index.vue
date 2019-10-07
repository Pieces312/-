<template>
  <div class="login_wrap">
    <p>未注册的手机号登录后将自动创建账号</p>
    <div class="input_row">
      <label>+86</label>
      <input type="tel" v-model="tel" placeholder="输入手机号" />
    </div>
    <div class="next">
      <button :class="{'disabled': tel == ''}" @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
import { formatPhone } from '@/utils'

export default {
  data () {
    return {
      disabled: true,
      tel: ''
    }
  },

  methods: {
    next () {
      const result = formatPhone(this.tel)
      if (result) {
        wx.showToast({
          title: '手机号应该是11位数字',
          image: '../../../../static/images/fail.png',
          duration: 3000,
          mask: true
        })
      }
    }
  }
}
</script>


<style lang="less" scoped>
.login_wrap {
  padding: 30px 15px;

  p {
    color: #999;
  }

  .input_row {
    margin: 20px 0 30px;
    display: flex;
    font-size: 15px;
    line-height: 40px;
    border-bottom: 1px solid #eee;

    label {
      width: 40px;
    }

    input {
      width: calc(100% - 40px);
      height: 40px;
      line-height: 40px;
      border: none;
    }
  }

  .next button {
    color: #fff;
    font-size: 15px;
    background: #ee3a23;
    border: none;
    border-radius: 20px;

    &.disabled {
      opacity: 0.4;
    }
  }
}
</style>

