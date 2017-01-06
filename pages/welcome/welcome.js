Page({
    enterApp:function(){
        wx.navigateTo({
          url: '/pages/newspage/newspage',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    onLoad:function(){
        setTimeout(() => {
            wx.redirectTo({
              url: '/pages/newspage/newspage',
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
        },3000);
    },
    onReady:function(){

    },
    onShow:function(){

    },
    onHide:function(){ // 页面被隐藏时
        console.log("welcome hide");
    },
    onUnload:function(){// 页面被销毁时
        console.log("welcome unload");
    }
});