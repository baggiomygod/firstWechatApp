import localData from '../../data/localDatabase.js'
Page({
    data: {
    },
    onLoad: function () {
        this.setData({
            newsArr_key: localData.dataList
        });
    },
    gotoDetail: function (event) {
        var newsId=event.currentTarget.dataset.newsId;
        wx.navigateTo({
            url: '/pages/newspage/news-detail/news-detail?newsId='+newsId
        });
    },
    gotoDetailFromSwiper:function(event) {
        var newsId=event.target.dataset.newsId;
        wx.navigateTo({
            url: '/pages/newspage/news-detail/news-detail?newsId='+newsId
        });
    }

})