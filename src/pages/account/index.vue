<template>
    <div class="account_wrap">
         <!-- 未登录状态 -->
        <div class="user_info">
            <div class="not_logged" v-if='!isLogin'>
                <p>登录网易云音乐</p>
                <p>手机电脑多端登录，尽享海量高品质音乐</p>
                <button class="btn" @click="toPage">立即登录</button>
            </div>

            <div class="login_in" v-else>
                <div class="user_avatar">
                    <div class="avatar_img"><img :src="userInfo.profile.avatarUrl" alt=""></div>
                    <div class="user_name">
                        <p>{{userInfo.profile.nickname}}</p>
                        <span class="user_level">Lv.{{userInfo.level}}</span>
                        <div class="sign">
                            <span v-if="!userInfo.mobileSign">签到</span>
                            <span v-else class="signed">已签到 <i class="iconfont icon-icon--"></i></span>
                        </div>
                    </div>
                </div>
                <div class="user_info">
                    <div class="info_item">
                        <span class="num">{{userInfo.profile.djStatus}}</span>
                        <p>动 态</p>
                    </div>
                    <div class="info_item">
                        <span class="num">{{userInfo.profile.follows}}</span>
                        <p>关 注</p>
                    </div>
                    <div class="info_item">
                        <span class="num">{{userInfo.profile.followeds}}</span>
                        <p>粉 丝</p>
                    </div>
                    <div class="info_item">
                        <i class="iconfont icon-bianji"></i>
                        <p>编辑资料</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 开通VIP -->
        <div class="open_vip">
            <div class="desc">
                <p>开通黑胶VIP</p>
                <span>新客仅5元</span>
            </div>
            <div class="discount">黑胶VIP立减50元 <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1624240531,2195794812&fm=26&gp=0.jpg" alt=""></div>
        </div>

        <div class="account_nav">
            <div class="nav_item" v-for="item in navsList" :key="item.id">
                <div class="icon">
                    <i class="iconfont" :class="[item.icon]"></i>
                </div>
                <div class="word">
                    <p>{{item.title}}</p>
                    <span>{{item.desc}}</span>
                </div>
            </div>
        </div>

        <!-- 列表菜单 -->
        <tableListView :tableList="tableList" />
    </div>
</template>

<script>
import tableListView from '@/components/table-list-view'

export default {
  components: {
    tableListView
  },
  data () {
    return {
      navsList: [
        {id: 1, icon: 'icon-xinxi', title: '消息', desc: ''},
        {id: 2, icon: 'icon-yanchu', title: '商城', desc: '5折79元秒杀'},
        {id: 3, icon: 'icon-piaoju', title: '演出', desc: '简单生活节'},
        {id: 4, icon: 'icon-yifu', title: '个性装扮', desc: ''}
      ],

      tableList: [
        {id: 'nav_1', icon: 'icon-tubiaozhizuomoban', title: '口袋彩铃', btmBar: false},
        {id: 'nav_2', icon: 'icon-dingdan', title: '我的订单', btmBar: true},
        {id: 'nav_3', icon: 'icon-shezhi', title: '设置', btmBar: false},
        {id: 'nav_4', icon: 'icon-yanchu', title: '夜间模式', btmBar: false},
        {id: 'nav_5', icon: 'icon-yanchu', title: '在线听歌免流量', btmBar: false},
        {id: 'nav_6', icon: 'icon-yanchu', title: '优惠券', btmBar: true},
        {id: 'nav_7', icon: 'icon-fenxiang', title: '分享网易云音乐', btmBar: false},
        {id: 'nav_8', icon: 'icon-guanyu', title: '关于', btmBar: false}
      ],

      isLogin: false,
      userInfo: null
    }
  },

  onShow () {
    let id = wx.getStorageSync('userId')

    this.$fly.get('http://localhost:3000/user/detail?uid=' + id).then(res => {
      let data = res.data
      if (data.code === 200) {
        this.isLogin = true
        console.log(data)
        this.userInfo = data
      }
    }).catch(() => {
      this.isLogin = false
    })
  },

  methods: {
    toPage () {
      wx.navigateTo({url: '../login/main'})
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/reset.less";

.account_wrap {
    padding: 0 15px 15px;
}

.user_info {
    padding: 15px 0;

    // 未登录状态
    .not_logged {
        text-align: center;
        line-height: 1.8;
        font-size: 14px;

        .btn {
            margin-top: 8px;
            font-size: 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
        }
    }

    // 登录状态
    .login_in .user_avatar {
        display: flex;
        align-items: center;

        .avatar_img {
            width: 60px;
            height: 60px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .user_name {
            padding-left: 15px;
            width: calc(100% - 60px);
            position: relative;

            p {
                font-size: 15px;
            }

            .user_level {
                margin-top: 5px;
                padding: 2px 11px;
                font-size: 11px;
                font-style: italic;
                color: #969595;
                font-weight: bold;
                background-color: #f1f1f1;
                border-radius: 20px;
            }

            .sign {
                position: absolute;
                top: 10px;
                right: 0;

                span {
                    padding: 2px 10px;
                    font-size: 12px;
                    color: #fff;
                    background: #ee3a23;
                    border-radius: 20px;
                }

                .signed {
                    color: #333;
                    border: 1px solid #f1f1f1;
                    background: #fff;

                    .iconfont {
                        font-size: 10px;
                        vertical-align: 1px;
                    }
                }
            }
        }
    }

    .login_in .user_info {
        display: flex;

        .info_item {
            width: 25%;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-right: 1px solid #f1f1f1;

            &:last-child {
                border-right: none;
            }

            .num, .iconfont {
                font-size: 18px;
                color: #333;
            }
        }
    }
}

// 开通VIP
.open_vip {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    vertical-align: center;
    background: #272727;
    border-radius: 8px;

    .desc {
        padding-right: 15px;
        border-right: 1px solid #3b3a3a;

        p {
            font-size: 15px;
            font-weight: bold;
            color: #e6caca;
        } 

        span {
            font-size: 10px;
            color: #646262;
        }
    }

    .discount {
        color: #fff;
        line-height: 40px;

        img {
            margin-left: 5px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}

// 账号导航
.account_nav {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    .bottom_bar();

    .nav_item {
        width: 25%;
        text-align: center;

        .iconfont {
            font-size: 25px;
            color: #ee3a23;
        }

        .word {
            span {
                margin-top: -3px;
                font-size: 10px;
                color: #999;
            }
        }
    }
}
</style>

