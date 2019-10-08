<template>
  <div class="login_wrap">
    <div class="input_row">
      <label>手机</label>
      <input type="tel" v-model="phone" placeholder="输入手机号" />
    </div>
    <div class="input_row">
      <label>验证码</label>
      <input type="tel" v-model="code" placeholder="验证码" />
      <button :style="{'background': codeCheck ? '#ee3a23' : '#ddd'}" @click="getCode">{{codeTxt}}</button>
    </div>
    <div class="input_row">
      <label>密码</label>
      <input type="tel" v-model="password" placeholder="输入密码" />
    </div>
    <div class="next">
      <button>注册</button>
    </div>
    <mptoast />
  </div>
</template>

<script>
import { formatPhone } from '@/utils'
import mptoast from 'mptoast'

export default {
  components: {
    mptoast
  },
  data () {
    return {
      disabled: true,
      phone: '',
      code: '',
      password: '',
      codeTxt: '获取验证码',
      count: 60,
      codeCheck: true
    }
  },

  methods: {
    getCode () {
      let timer = null

      if (this.codeCheck) {
        this.codeCheck = false
        timer = setInterval(() => {
          this.count--
          this.codeTxt = this.count + 's后获取'

          if (this.count < 0) {
            this.codeTxt = '获取验证码'
            this.count = 60
            this.codeCheck = true
            clearInterval(timer)
          }
        }, 1000)

        this.$mptoast('验证码已发送')
        this.$fly.get('http://localhost:3000/captcha/sent?phone=' + this.phone).then(res => {
        })
      } else {
        this.$mptoast('请不要重复操作')
      }
    },

    next () {
      if (!this.tel) return
      const result = formatPhone(this.tel)
      if (this.tel.length < 11) {
        this.$mptoast('手机号应该是11位数字', 'error')
      } else if (result) {
        this.$mptoast('手机号格式有误：非法手机号', 'error')
      } else {
        wx.navigateTo({url: '../password/main?tel=' + this.tel})
      }
    }
  }
}
</script>


<style lang="less" scoped>
.login_wrap {
  padding: 0 15px;

  p {
    color: #999;
  }

  .input_row {
    margin: 20px 0 30px;
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 40px;
    border-bottom: 1px solid #eee;

    label {
      width: 60px;
    }

    button {
      width: 100px;
      color: #fff;
      font-size: 12px;
      background: #ee3a23;
      border-radius: 20px;
    }

    input {
      width: calc(100% - 60px - 100px);
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

