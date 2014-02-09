# Angular音乐盒

#### 一个基于AngularJS的移动WebAPP项目

---

## 客户端

客户端的目录结构使用Yeoman生成，位于`client`文件夹内部。

为了使得调试/开发环境可用，请按照如下步骤确保开发环境完备正常：

* 安装Node.js、bower、Compass
* 进入`client`目录执行如下命令，通过NPM安装依赖模块（主要是Grunt及其插件）：

		$ npm install

* 进入`client`目录执行如下命令安装依赖的JavaScript库：

		$ bower install

* 执行`$ grunt server`开启浏览器，启动调试（请阅读[FAQ](#如何在Chrome中调试本项目)来确保调试正常）。


## 服务端

本项目服务端代码放置于`server`文件夹内，为发布后的客户端提供RESTFUL风格的API接口。本应用使用`NodeJS + MongoDB`来实现请求处理和数据存储。请按照如下步骤确保服务运行：

* 安装Node.js和MongoDB
* 进入`server`文件夹执行如下命令，通过NPM安装依赖模块：
	
	$ npm install

* 执行如下命令开启服务：

	$ node server

* 访问`http://localhost:1987`来访问发布后的应用，如果需要改变端口号，请修改`server/server.js`文件。

## FAQ

### 如何在Chrome中调试本项目

本项目调试使用的是`grunt-contrib-connect`插件来提供静态服务器，为了能够访问服务端资源，请通过如下命令关闭Chrome的跨域安全限制：

针对Mac：

	$ open -a Google\ Chrome --args --disable-web-security

针对Linux：

	$ google-chrome --disable-web-security

针对Windows：

	chrome.exe --disable-web-security

> 如果希望开启本地文件访问，可以使用`--allow-file-access-from-files`参数。