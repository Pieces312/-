<template>
    <div class="layout">
        <div class="bgimg" :style='{"height": _h + "px"}'>
            <img :src="bgImg" alt="">
        </div>
        <div class="top-tips" v-if="tipWord">{{tipWord}}</div>
        <div class="layout-body">
            <div class="layout-head" :style='{"height": _h + "px"}'>
                <div>123</div>
            </div>
            <div class="layout-content" :class="{'hidden': hidden}">
                <div class="head">
                    <p>123456789</p>
                </div>
                <div v-for="item in 60" :key='item'>{{item+1}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    height: String,
    bgImg: String,
    tipWord: String
  },

  data () {
    return {
      hidden: false
    }
  },

  computed: {
    _h () {
      return this.height.indexOf('px') >= 0 ? this.height.replace('px', '') : this.height
    }
  },

  onPageScroll (e) {
    console.log(e)
    if (e.scrollTop > 125) {
      this.hidden = true
    } else {
      this.hidden = false
    }
  }
}
</script>

<style lang="less" scoped>
.bgimg {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    &::before {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        content: "";
        background: rgba(0,0,0,.5);
    }

    img {
        width: 100%;
        height: 100%;
    }
}

.top-tips {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    font-size: 12px;
    text-align: center;
    color: #fff;
    animation: fadeOut 3s ease forwards;
}

.layout-body {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
}

.layout-head {
    width: 100%;
}

.layout-content {
    margin-top: -20px;
    text-align: center;
    font-size: 20px;

    .head {
        margin-top: 20px;
        padding-top: 10px;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 99;

        p {
            line-height: 40px;
            background: #fff;
            border-radius: 10px 10px 0 0;
        }
    }
}


@keyframes fadeOut {
    0% {
        opacity: 1
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>


