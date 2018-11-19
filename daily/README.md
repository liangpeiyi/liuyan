运行方法：<br>
npm install<br>
npm run dev<br>
node proxy.js<br>

说明：<br>
安装request（node.js的request库）来做代理<br>
npm install request --save-dev<br> 
启动代理<br>
node proxy.js<br>
安装axios（基于promise的http库）来做ajax请求<br>
npm install axios --save<br>

文件说明：<br>
proxy.js 代理<br>
libs/util.js 封装工具函数<br>
main.js 导入样式<br>
app.vue 入口文件 基本结构：左menu 中list 右article<br>
components/item.vue 2个文章列表的item<br>
components/daily-article.vue 文章内容<br>

![image](https://github.com/liangpeiyi/vue/blob/master/images/daily%20(1).png?raw=true)<br>

![Image text](https://github.com/liangpeiyi/vue/blob/master/images/daily%20(2).png?raw=true)<br>