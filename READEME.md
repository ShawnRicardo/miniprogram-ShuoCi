# 微信小程序 — 说词儿

## 介绍

就是输入一个词，然后调用 coze 大模型 api，生成一段描述

这个描述给的 prompt 是 言辞犀利、讽刺、仿照鲁迅语气，还是挺有意思的

## 示例

<img src="https://ricardo-typora-image-submit.oss-cn-beijing.aliyuncs.com/img/202412310209597.png" alt="image-20241231020910540" style="zoom:50%;" />

<img src="https://ricardo-typora-image-submit.oss-cn-beijing.aliyuncs.com/img/202412310209250.png" alt="image-20241231020949221" style="zoom: 50%;" />

## 心得



第一次用 cursor 做微信小程序，跟着b站视频一起学习，并且第一次接触并使用了 coze 这个非常有意思的 AI 自定义工具，接下来记录一下心得

### 问题一

域名不安全（真的是莫名其妙）

解决方案，在 微信小程序开发网页端，如下操作，把域名写进去

然后重启！！！重启重启重启

![image-20241231021236391](https://ricardo-typora-image-submit.oss-cn-beijing.aliyuncs.com/img/202412310212444.png)

### 问题二

第一个就是整个做好以后，一直显示 “当前地区不支持此服务” 的报错。

解决方法，1. 关闭梯子；2. 重启小程序编辑器

coze 这个网站很奇怪（coze.cn），一旦挂上了梯子，连网页都进不去，所以一定要关闭梯子

重启小程序编辑器非常重要！！！就算关闭梯子了，但是不重启，也一样不行

> 第一个问题困扰了半个小时，tmd 结果气愤的关了程序，再重启，莫名奇妙好了

### 问题三

第二个问题纯属对 前端知识不太了解以及没仔细检查 cursor 生成的代码造成的。

```js
const response = await new Promise((resolve, reject) => {
        wx.request({
          url: 'https://api.coze.cn/v1/workflow/run',
          method: 'POST',
          header: {
            'Authorization': 'Bearer pat_RNPfuwpnTLtuaiJYRz7P9Htw7AoYtPXuvNXaGtFZi6B0ic0nufpgxOYB6S5sO77V',
            'Content-Type': 'application/json'
          },
          data: {
            workflow_id: '7454178606152663076',
            parameters: {
                // text: this.data.inputText
                BOT_USER_INPUT: this.data.inputText  // 就是这里，变量名，一定要和 工作流 中自定义的变量名相同，要不然无法传参

            }
          },
          success: (res) => {
            console.log('请求成功，响应数据：', res)
            resolve(res)
          },
          fail: (error) => {
            console.error('请求失败：', error)
            reject(error)
          }
        })
      })
```

本来，parameters 中的变量是 第 12 行 那样，因为 AI 生成的是那样。

但是死活把变量传不进去。

刚开始还以为是因为前后端连接问题，摸索了一个小时。。。

最后发现，这个变量名不是随心所欲的，而是一定要和后端（api）对应上的。

<img src="https://ricardo-typora-image-submit.oss-cn-beijing.aliyuncs.com/img/202412310204615.png" alt="image-20241231020359486" style="zoom: 67%;" />

这个变量名，一定要和 coze 工作流中，最开始输入的变量名对上。

我刚开始看视频中是默认的 BOT_USER_INPUT，而自己又新建了一个 input 变量，以为也是 input 变量。其实不是！

视频中 BOT_USER_INPUT 变量是 自带的，而现在使用的新版的 coze 不是自带的！！

所以我仿照老版手敲的 BOT_USER_INPUT ，就是我实际的变量名！

最后还是看了 CSDN 的博客才知道，变量名变量名变量名！

后来，改成 13 行那样，就好了