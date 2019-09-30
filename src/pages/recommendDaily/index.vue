<template>
  <div>
      <songLayout height="200px"
        bgImg="http://img1.imgtn.bdimg.com/it/u=3247749323,1379996244&fm=26&gp=0.jpg"
        maskColor="#fff"
        maskOpacity="60">
          <div slot="header">123</div>
        </songLayout>
  </div>
</template>

<script>
import songLayout from '@/components/songLayout'

export default {
  components: {
    songLayout
  },

  data () {
    return {
    }
  },

  created () {
  }
}
</script>
