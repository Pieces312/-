# 仿网易云音乐 小程序

> 主要使用mpvue+fly+网易云音乐api，开启每日打卡。

### 日期打卡
- 2019年9月29日 完成首页和搜索页面的大部分接口，交互待完善；
- 2019年9月30日 完成听歌识曲、歌单广场页面，每日推荐页面开发50%。页面交互待完善；

> tips: 
    1. mpuve中不支持filter过滤器函数，应用其他的方式替代；

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
