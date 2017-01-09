import localData from '../../../data/localDatabase.js'
let app = getApp();
Page({
    data: {
        musicPlay: false
    },
    onLoad: function (option) {
        let newsId = option.newsId;
        let g_isPlayingMusic = app.globalData.g_isPlayingMusic;
        let g_currentMusicNewsId = app.globalData.g_currentMusicNewsId;
        this.setData({
            newsId: newsId,
        });
        localData.dataList.forEach((eachData) => {
            if (eachData.postId == newsId) {
                this.setData({
                    newsData: eachData
                });
            }
        });

        let newsCollected = wx.getStorageSync('news_collection');
        if (newsCollected) {
            let collectState = newsCollected[newsId];
            this.setData({
                collected: collectState
            });
        } else {
            let newsCollected = {};
            newsCollected[newsId] = false;
            wx.setStorageSync('news_collection', newsCollected);
        }
        if (g_isPlayingMusic && g_currentMusicNewsId === newsId) {
            this.setData({
                musicPlay: true
            });
        }
        // 监听音乐播放
        this.setMusicMonitor();
    },
    setMusicMonitor: function () {
        let that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                musicPlay: true
            });
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicNewsId = that.data.newsId;
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                musicPlay: false
            });
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicNewsId = null;
        });
    },
    setLocalOfCollection: function () {
        // this.onNewsCollectionSync();// 同步方法
        this.onNewsCollectionAsy();// 异步方法
    },
    onNewsCollectionSync: function () {
        let newsCollectedStorage = wx.getStorageSync('news_collection');
        let newsIdCollected = newsCollectedStorage[this.data.newsId];
        // 取反设置收藏状态
        newsIdCollected = !newsIdCollected;
        this.showToast(newsCollectedStorage, newsIdCollected);
        // this.showModal(newsCollectedStorage,newsIdCollected);
    },
    onNewsCollectionAsy: function () {
        let that = this;
        wx.getStorage({
            key: "news_collection",
            success: function (res) {
                let newsCollectedStorage = res.data;
                let newsIdCollected = newsCollectedStorage[that.data.newsId];
                newsIdCollected = !newsIdCollected;
                that.showToast(newsCollectedStorage, newsIdCollected);
                // this.showModal(newsCollectedStorage,newsIdCollected);
            }
        })
    },
    onShareTap: function () {
        this.showActionSheet()
    },
    showToast: function (newsCollectedStorage, newsIdCollected) {
        newsCollectedStorage[this.data.newsId] = newsIdCollected;
        wx.setStorageSync("news_collection", newsCollectedStorage);
        this.setData({ collected: newsIdCollected });
        wx.showToast({
            title: newsIdCollected ? "收藏成功" : "已取消",
            icon: "success",
            durtion: "1000"
        });
    },
    showModal: function (newsCollectedStorage, newsIdCollected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#999",
            confirmText: "确定",
            confirmColor: "#666",
            content: newsIdCollected ? "是否收藏" : "是否取消收藏",
            success: function (res) {
                if (res.confirm) {
                    console.log(res.confirm);
                    newsCollectedStorage[that.data.newsId] = newsIdCollected;
                    wx.setStorageSync("news_collection", newsCollectedStorage);
                    that.setData({
                        collected: newsIdCollected
                    });
                }
            }

        });
    },
    showActionSheet() {
        let that = this;
        wx.showActionSheet({
            itemList: ["分享给微信好友", "分享到朋友圈", "分享到微博", "分享到到QQ"],
            itemColor: "#405f80",
            success: function (res) {
                console.log(res);
                console.log(res.cancel);
            }
        })
    },
    onMusicTap: function () {
        let music = this.data.newsData.music;
        if (this.data.musicPlay) {
            wx.pauseBackgroundAudio();
        } else {
            wx.playBackgroundAudio({
                dataUrl: music.url,
                title: music.title,
                coverImgUrl: music.coverImg
            });
        }
        this.setData({
            musicPlay: !this.data.musicPlay
        });

    }
});