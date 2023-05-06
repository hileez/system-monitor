# system-monitor

Language: [简体中文](https://github.com/supercoderlee/system-monitor/blob/main/docs/readme/zh-cn.md) | English

This is an application based on Electron that creates and uses node-pyrunner to execute Python, achieving monitoring of system resource usage such as CPU and memory. The Python section mainly uses a third-party library, psutil, to obtain hardware usage information such as system CPU and memory, and ultimately presents data in Electron through echarts.

![img](https://img-blog.csdnimg.cn/4f6958dd5afa422cb18979fea4f892d0.gif#pic_center)

![img](https://img-blog.csdnimg.cn/0f45dc4173a84a48ac3adc85e6b3d89b.gif#pic_center)

**Project structure**

~~~bash
system-monitor:.
│  echarts.min.js	#echarts
│  index.html		#electron page
│  index.js			#electron main process js script
│  package.json		#npm project config
│  python3.dll		#python dll
│  python310.dll	#python dll
│  README.md
│  renderer.js		#index.html js script
│  styles.css
│
├─pyscript
│  │  app.py	#python script
│  │
│  └─venv
│      └─Lib
│          └─site-packages	#python venv module
│
└─python	#python3.10
~~~

## Clone

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/supercoderlee/system-monitor.git
# Go into the repository
cd system-monitor
# Install dependencies
npm install
```

## Install psutil

install python and execute this command create virtual environment:

~~~bash
python -m venv pyscript/venv
~~~

activate virtual environment:

~~~bash
pyscript/venv/Scripts/activate
~~~

install psutil module:

~~~bash
pip install psutil
~~~

## Application start

~~~bash
npm start
~~~

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [Electron Fiddle](https://electronjs.org/fiddle) - Electron Fiddle, an app to test small Electron experiments
- [node-pyrunner/docs](https://github.com/supercoderlee/node-pyrunner/tree/main/docs) - all of Node-PyRunner's documentation
