# system-monitor 系统资源监视器

Language: 简体中文 | [English](https://github.com/supercoderlee/system-monitor/blob/main/docs/readme/en.md)

这是一个基于Electron创建并使用node-pyrunner执行python的应用，实现了CPU、内存等系统资源使用的监视。Python部分主要用第三方库psutil获取系统CPU和内存等硬件使用情况，最终在Electron中通过echarts呈现数据。

![img](https://img-blog.csdnimg.cn/4f6958dd5afa422cb18979fea4f892d0.gif#pic_center)

![img](https://img-blog.csdnimg.cn/0f45dc4173a84a48ac3adc85e6b3d89b.gif#pic_center)

**项目目录**

~~~bash
system-monitor:.
│  echarts.min.js	#echarts图表
│  index.html		#electron页面
│  index.js			#node入口文件
│  package.json		#npm项目配置文件
│  python3.dll		#python解释器动态库
│  python310.dll	#python解释器动态库
│  README.md
│  renderer.js		#index.html页面JS脚本文件
│  styles.css
│
├─pyscript
│  │  app.py	#python脚本
│  │
│  └─venv
│      └─Lib
│          └─site-packages	#python虚拟环境第三方pip包目录
│
└─python	#python解释器目录
~~~

## 克隆项目

你需要[Git](https://git-scm.com)工具和[Node.js](https://nodejs.org/en/download/) (包含[npm](http://npmjs.com))克隆到本地才能运行，执行以下命令:

```bash
# 克隆仓库
git clone https://github.com/supercoderlee/system-monitor
# 进入目录
cd system-monitor
# 安装依赖
npm install
```

## 安装psutil模块

安装python在当前项目下执行命令创建虚拟环境

~~~bash
python -m venv pyscript/venv
~~~

> 使用虚拟环境的目的是方便打包发布应用时包含python模块。

激活虚拟环境

~~~bash
pyscript/venv/Scripts/activate
~~~

安装psutil模块

~~~bash
pip install psutil
~~~

## 启动应用

~~~bash
npm start
~~~

## 学习资料

- [electronjs.org/docs](https://electronjs.org/docs) - Electron所有文档
- [Electron Fiddle](https://electronjs.org/fiddle) - 测试Electron的实验。
- [node-pyrunner/docs](https://github.com/supercoderlee/node-pyrunner/tree/main/docs) - Node-PyRunner文档
