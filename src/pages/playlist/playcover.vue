<template>
    <div class="playcover" :style="{'opacity': showCover ? 1 : 0, 'visibility': showCover ? 'visible' : 'hidden'}">
        <img class="bg" :src="coverInfo.coverImgUrl" alt="">
        <div class="play_content">
            <div class="play_head">
                <i class="iconfont icon-guanbi" @click="close"></i>
            </div>
            <div class="cover_info">
                <div class='cover_img'>
                    <img :src="coverInfo.coverImgUrl" alt="">
                    <p>{{coverInfo.name}}</p>
                </div>
                <div class="cover_tag">
                    <label>标签：</label>
                    <div class="tag_list">
                        <span v-for="(item, index) in coverInfo.tags" :key="index">{{item}}</span>
                    </div>
                </div>
                <div class="cover_desc">{{coverInfo.description}}</div>
            </div>
            <div class="play_footer">
                <button>保存封面</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  props: {
    coverInfo: Object,
    showCover: Boolean
  },

  methods: {
    close () {
      this.$emit('closeModal', !this.showCover)
    }
  }
}
</script>

<style lang="less" scoped>
.playcover {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
    transition: all .8s ease;

    .bg {
        width: 180%;
        height: 150%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: blur(20px)
    }

    .play_content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
        color: #fff;
        background-color: rgba(0,0,0,.3);

        .play_head {
            padding: 10px;
            text-align: right;

            .iconfont {
                font-size: 18px;
            }
        }

        .cover_info {
            padding: 0 20px;
            height: calc(100% - 130px);
            overflow-y: scroll;
            color: #d4d1d1;

            .cover_img {
                text-align: center;

                img {
                    width: 180px;
                    height: 180px;
                    border-radius: 3px;
                }

                p {
                    margin-top: 10px;
                    font-size: 15px;
                    letter-spacing: 1px;
                }
            }

            .cover_tag {
                margin-top: 10px;
                padding-top: 15px;
                display: flex;
                align-items: center;
                font-size: 13px;
                border-top: 1px solid #a19a9a;

                .tag_list span {
                    margin-right: 5px;
                    padding: 0 10px;
                    font-size: 12px;
                    background: rgba(255,255,255, .1);
                    border-radius: 20px;
                }
            }

            .cover_desc {
                margin-top: 10px;
                white-space: pre-wrap;
                font-size: 13px;
                line-height: 1.7;
            }
        }

        .play_footer {
            width: 100%;
            height: 120px;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 11;
            text-align: center;
            background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));

            button {
                padding: 4px 18px;
                position: absolute;
                bottom: 25px;
                left: 50%;
                transform: translateX(-50%);
                display: inline-block;
                color: #d4d1d1;
                font-size: 13px;
                line-height: 1.5;
                border-radius: 20px;
                border: 1px solid #d4d1d1;
            }
        }
    }
}
</style>