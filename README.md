# xinleaf_company
一个小型的基于vue-express-mongodb的企业站项目

## 项目环境搭载
 1. 检查本地node版本 : Node -v  
	v6.9.1  
 2. 检查本地npm版本 : npm -v,如果版本太低可以通过 : npm install -g npm 进行升级  
 3. 安装vue脚手架 : npm install vue-cli -g
 4. npm install express-generator -g （express-generator是express的应用生成器)

### MonogoDB  

	3.2.10
### express 4.X

### vue 2.0

## 目录结构
<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── views          // 各种页面
│   ├── store           // vuex状态管理器
│   ├── filters.js     // 各种过滤器
│   └── main.js        // Webpack 预编译入口
├── server            //服务器接口目录
│   ├── bin           //服务器启动目录
│   ├── models        //数据库表文件
│   ├── router          // 数据接口文件目录
│   └── app.js           // express核心配置文件
├── doc              //开发过程中遇到的问题和开发手册以及注意事项 
</pre>
