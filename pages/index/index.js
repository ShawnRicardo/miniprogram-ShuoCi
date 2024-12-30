// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    loading: false
  },

  onInputChange(e) {
    this.setData({
      inputText: e.detail.value
    })
  },

  async onSubmit() {
    if (!this.data.inputText.trim()) {
      wx.showToast({
        title: '请输入文字',
        icon: 'none'
      })
      return
    }

    // wx.showLoading({
    //     title:"生成中..."
    // })

    this.setData({ loading: true })

    try {
      console.log('开始请求，参数：', this.data.inputText)
      
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

      console.log('完整响应：', response)

      if (!response || !response.data) {
        throw new Error('No response data')
      }

      if (response.data.code === 0) {
        console.log('响应code为0，解析data：', response.data.data)
        const result = JSON.parse(response.data.data)
        
        if (result.output) {
          console.log('获取到图片URL：', result.output)
          this.setData({
            imageUrl: result.output
          })
        } else {
          console.error('响应中没有output字段：', result)
          throw new Error('No image URL in response')
        }
      } else {
        console.error('响应code不为0：', response.data)
        throw new Error(response.data.msg || '请求失败')
      }
    } catch (error) {
      console.error('完整错误信息：', error)
      wx.showToast({
        title: error.message || '生成失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  previewImage() {
    if (this.data.imageUrl) {
      wx.previewImage({
        urls: [this.data.imageUrl]
      })
    }
  }
})
