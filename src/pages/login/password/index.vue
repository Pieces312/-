<template>
  <div class="login_wrap">
    <div class="input_row">
      <input type="password" v-model="password" placeholder="输入密码" />
    </div>
    <div class="next">
      <button @click="loginNow">立即登录</button>
    </div>
    <mptoast />
  </div>
</template>

<script>
import mptoast from 'mptoast'

export default {
  components: {
    mptoast
  },
  data () {
    return {
      disabled: true,
      tel: '',
      password: ''
    }
  },

  onLoad (options) {
    this.tel = options.tel
  },

  methods: {
    loginNow () {
      if (!this.password) {
        this.$mptoast('密码不能为空', 'error')
      } else {
        this.$fly.get('http://localhost:3000/login/cellphone?phone=' + this.tel + '&password=' + this.password).then(res => {
          let data = res.data
          this.$mptoast('登录成功')
          wx.setStorage({
            key: 'userId',
            data: data.account.id
          })
          wx.switchTab({url: '../../account/main'})
        }).catch(error => {
          let err = error.response.data
          this.$mptoast(err.msg)
        })
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
    border-bottom: 1px solid #eee;

    input {
      width: 100%;
      height: 40px;
      font-size: 15px;
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
  }

  .next p {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: #999;

    .iconfont {
      font-size: 10px;
      vertical-align: 1px;
    }
  }
}
</style>

