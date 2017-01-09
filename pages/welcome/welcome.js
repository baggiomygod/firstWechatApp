Page({
    enterApp:function(){
        wx.switchTab({
          url: '/pages/newspage/newspage'
        });
    },
    onLoad:function(){
        setTimeout(() => {
            // wx.redirectTo
            // wx.navigateTo
          wx.switchTab({
            // url: '/pages/newspage/newspage',
            url: '/pages/movies/movies',
            success:function(){
            },
            fail:function(){
            }
          });
        },300);
    }
});