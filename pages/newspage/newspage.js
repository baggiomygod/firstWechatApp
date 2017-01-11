import localData from '../../data/localDatabase.js'
Page({
    data: {
    },
    onLoad() {
        this.setData({
            newsArr_key: localData.dataList
        });
    },
    gotoDetail(event) {
        var newsId=event.currentTarget.dataset.newsId;
        wx.navigateTo({
            url: '/pages/newspage/news-detail/news-detail?newsId='+newsId
        });
    },
    gotoDetailFromSwiper(event) {
        var newsId=event.target.dataset.newsId;
        wx.navigateTo({
            url: '/pages/newspage/news-detail/news-detail?newsId='+newsId
        });
    }

})