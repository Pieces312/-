# 仿网易云音乐 小程序

> 主要使用mpvue+fly+网易云音乐api，开启每日打卡。

### 日期打卡
- 2019年9月29日 完成首页和搜索页面的大部分接口，交互待完善；
- 2019年9月30日 完成听歌识曲、歌单广场页面，每日推荐页面开发50%。页面交互待完善；
- 2019年10月1日，祖国70周年，代码质量不高，完善了每日推荐的动画部分，开始账号页面的开发；
- 2019年10月2日，账号页面、登录首页开发完成，开始开发登录页面；
- 2019年10月7日，手机号登录页面开发完成，交互待完善；
- 2019年10月8日，新添加mptoast弹窗插件，手机登录流程已经开发完成，账号页面用户信息完成，每日推荐列表开发80%；
- 2019年10月9日，完成歌单详细页面+搜索结果页面，每日推荐动画效果已解决；

> ### Tips:
    1. mpuve中不支持filter过滤器函数，应用其他的方式替代；
    2. mpvue对于新建页面的文件都有固定的文件名，一旦文件名改变页面就不能显示；
    3. 使用深度作用选择器 `/deep/` 修改UI框架的样式；
        eg：
            .text-box {
                /deep/ input {
                    height: 35px;
                    border: none
                }
            } 
    4. mpvue不支持全局定义组件，只能在使用的页面引入使用；
    5. 在mpvue中，请求接口的方式不要写在created钩子函数中，这样会造成所有页面的请求在同一时间一起请求，正确的方法应放在onLoad或onShow小程序的钩子函数中；


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
