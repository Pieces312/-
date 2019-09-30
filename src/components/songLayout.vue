<template>
    <div class="song_layout drop_down_animate" @touchstart="dropDownStart" @touchmove="dropDown">
        <div class="layout_head" :style="{'height': _height + 'px', 'background-image': 'url(' + bgImg + ')'}">
            <div class="mask" :style="{'background-color': maskColor, 'opacity': _opacity}"></div>
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
    bgImg: String,
    maskColor: String,
    maskOpacity: [String, Number]
  },
  computed: {
    _height () {
      let _h = toString(this.height)
      let hasUnit = _h.indexOf('px') > -1
      return hasUnit ? _h.replace('px', '') : _h
    },
    _opacity () {
      return this.maskOpacity < 1 ? this.maskOpacity : this.maskOpacity / 100
    }
  },
  methods: {
    dropDownStart (e) {
    //   let pageY = e.pageY
    },

    dropDown (e) {
      console.log(e.pageY)
      if (e.pageY > 200) {
        this.height = e.pageY
      }
    }
  }
}
</script>

<style lang="less" scoped>
.song_layout {
    .layout_head {
        position: relative;
        background-position: center center;
        background-size: cover;

        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
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
        padding: 15px;
        width: 100%;
        position: relative;
        z-index: 9;
        min-height: 40px;
        background: #fff;
        border-radius: 15px 15px 0 0;
    }
}

.drop_down_animate {

}
</style>