<template>
  <div class="song_type">
    <div class="song_title">
      {{songtitle}}
      <span class="song_tag">{{tagname}}</span>
    </div>

    <div class="song_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    songtitle: {
      require: true,
      type: String
    },
    tagname: String
  }
}
</script>

<style lang="less" scoped> 
.song_type {
  padding: 15px;

  .song_title {
    font-size: 16px;
    font-weight: bold;

    .song_tag {
      padding: 2px 8px;
      float: right;
      font-size: 13px;
      font-weight: 400;
      border: 1px solid #ddd;
      border-radius: 20px;
    }
  }
}
</style>
