// pages/blog/blog.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //控制底部弹出层是否显示
        modalShow: false,
        blogList: [],
    },
    //发布功能
    onPublish(){
        wx.getSetting({
          success:(res)=>{
              console.log(res)
              if(res.authSetting['scope.userInfo']){
                  wx.getUserInfo({
                    success:(res)=>{
                        // console.log(res)
                        this.onLoginSuccess({
                            detail: res.userInfo
                        })
                    }
                  })
              }
              else{
                  this.setData({
                      modalShow: true,
                  })
              }
          }
        })
    },
    onLoginSuccess(event){
        console.log(event)
        const detail=event.detail
        wx.navigateTo({
          url: `../../components/blog-edit/blog-edit?nickName=${detail.nickName} & avatarUrl=${detail.avatarUrl}`,
        })
    },
    onLoginfail(){
        wx.showModal({
          title:'授权用户才能发布内容',
          content:'',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadBlogList()
    },
    _loadBlogList(){
        wx.cloud.callFunction({
            name: 'blog',
            data: {
                $url:'list',
                start: 0,
                count:10,
            }
        }).then((res)=>{
            this.setData({
                blogList: this.data.blogList.concat(res.result)
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})