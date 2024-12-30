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

    this.setData({ loading: true })

    try {
      // TODO: 调用 coze API 获取图片 URL
      // const response = await wx.request({
      //   url: 'YOUR_COZE_API_URL',
      //   method: 'POST',
      //   data: {
      //     text: this.data.inputText
      //   }
      // })
      
      // 这里暂时使用模拟数据
      const mockImageUrl = 'https://placeholder.com/300x300'
      
      this.setData({
        imageUrl: mockImageUrl
      })
    } catch (error) {
      wx.showToast({
        title: '生成失败，请重试',
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
