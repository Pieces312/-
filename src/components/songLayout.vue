<template>
    <div class="song_layout" 
         @touchend="dropDownEnd" 
         @touchmove="dropDown"
         :class="{'sticky': stickyTop}">
      <div class="top_tips">{{tipWord}}</div>
      <div class="layout_head" :style="{'height': _height + 'px'}">
          <div class="mask" :style="{'background-color': maskColor, 'opacity': _opacity, 'width': scaleNum + '%', filter: 'blur('+ filter +'px)'}">
            <img :src="bgImg" alt="" />
          </div>
          <div class="layout_head_content">
              <slot name="header"></slot>
          </div>
      </div>
      <div class="layout_content" id="layout_content">
        <div class="lc_head">
          <slot name="lc_head"></slot>
        </div>
        <div class="lc_content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    height: [String, Number],
    bgImg: {
      type: String,
      default: '#ddd'
    },
    tipWord: String,
    maskColor: String,
    maskOpacity: [String, Number],
    filter: {
      type: Number,
      default: 0
    },
    drop_down_animate: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      defaultHeight: this.height,
      scaleNum: 110,
      stickyTop: false
    }
  },

  computed: {
    _height () {
      let _h = this.height.toString()
      let hasUnit = _h.indexOf('px') > -1
      return hasUnit ? _h.replace('px', '') : _h
    },
    _opacity () {
      return this.maskOpacity < 1 ? this.maskOpacity : this.maskOpacity / 100
    }
  },

  // 页面滚动事件
  onPageScroll (e) {
    const newly = wx.createSelectorQuery()

    newly.select('#layout_content').boundingClientRect(rect => {
      let top = rect.top
      console.log(top)
      if (top <= 10) {
        this.stickyTop = true
      } else {
        this.stickyTop = false
      }
    }).exec()
  },

  methods: {
    dropDown (e) {
      if (!this.drop_down_animate) return
      let _h = parseFloat(this._height)
      this.height = _h + 0.2
      this.scaleNum += 0.1
    },

    dropDownEnd (e) {
      if (!this.drop_down_animate) return
      this.height = this.defaultHeight
      this.scaleNum = 110
    }
  }
}
</script>

<style lang="less" scoped>
.song_layout {
  width: 100%;
  overflow: visible;

  &.sticky {
    position: fixed;
    top: -220px;
    right: 0;
    left: 0;
  }

  .top_tips {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    color: #fff;
    overflow: hidden;
    opacity: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    animation: fadeOut 3s ease;
  }

  .layout_head {
    position: relative;
    overflow: hidden;
    background-color: #686565;
    background-position: center center;
    background-size: cover;

    .mask {
      width: 110%;
      height: 110%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
        z-index: 1;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .layout_head_content {
      padding: 15px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
    }
  }

  .layout_content {
    margin-top: -15px;
    padding: 0 15px;
    width: 100%;
    min-height: 40px;
    position: relative;
    z-index: 9;
    background: #fff;
    border-radius: 15px 15px 0 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  80% {
    opacity: 1
  }

  100% {
    opacity: 0;
  }
}
</style>