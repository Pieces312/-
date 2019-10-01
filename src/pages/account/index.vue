<template>
    <div class="account_wrap">
         <!-- 未登录状态 -->
        <div class="user_info">
            <div class="not_logged">
                <p>登录网易云音乐</p>
                <p>手机电脑多端登录，尽享海量高品质音乐</p>
                <button class="btn">立即登录</button>
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
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.account_wrap {
    padding: 0 15px;
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
    padding: 12px;
    display: flex;
    justify-content: space-between;
    vertical-align: center;
    background: #272727;
    border-radius: 8px;
}
</style>

