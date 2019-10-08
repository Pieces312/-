<template>
    <div class="song_layout" @touchend="dropDownEnd" @touchmove="dropDown">
      <div class="top_tips">{{tipWord}}</div>
      <div class="layout_head" :style="{'height': _height + 'px'}">
          <div class="mask" :style="{'background-color': maskColor, 'opacity': _opacity, 'transform': 'scale(' + scaleNum + ')'}">
            <img :src="bgImg" alt="" />
          </div>
          <div class="layout_head_content">
              <slot name="header"></slot>
          </div>
      </div>
      <div class="layout_content">
          <slot name="content"></slot>
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
    tipWord: {
      type: String,
      default: '根据你的音乐口味，为你推荐好音乐'
    },
    maskColor: String,
    maskOpacity: [String, Number],
    drop_down_animate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      defaultHeight: this.height,
      scaleNum: 1
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
  methods: {
    dropDown (e) {
      if (!this.drop_down_animate) return
      let _h = parseFloat(this._height)
      this.height = _h + 0.2
      this.scaleNum += 0.0005
    },

    dropDownEnd (e) {
      if (!this.drop_down_animate) return
      this.height = this.defaultHeight
      this.scaleNum = 1
    }
  }
}
</script>

<style lang="less" scoped>
.song_layout {
  overflow: visible;

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
      background-color: #686565;
      background-position: center center;
      background-size: cover;

      .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          overflow: hidden;
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