<template>
    <div class="account_wrap">
         <!-- 未登录状态 -->
        <div class="user_info">
            <div class="not_logged">
                <p>登录网易云音乐</p>
                <p>手机电脑多端登录，尽享海量高品质音乐</p>
                <button class="btn" @click="toPage">立即登录</button>
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
      ]
    }
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

