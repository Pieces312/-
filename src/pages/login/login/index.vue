<template>
  <div class="login_wrap">
    <div class="input_row">
      <label>+86</label>
      <input type="tel" v-model="tel" placeholder="输入手机号" />
    </div>
    <div class="next">
      <button :class="{'disabled': tel == ''}" @click="next">下一步</button>
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
      tel: ''
    }
  },

  methods: {
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

