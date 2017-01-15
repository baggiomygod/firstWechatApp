// pages/movies/movies-grid/movies-grid.js
let app = getApp();
import util from '../../../util/util.js';
Page({
  data: {
    movies: [],
    navigationBarTitle: "",
    requestUrl: "",
    totalCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.showNavigationBarLoading();
    let category = options.category;
    let doubanMovieBaseUrl = app.globalData.doubanBaseUrl + '/v2/movie';
    let moviesUrl = doubanMovieBaseUrl + "" + options.category;
    let navigationBarTitle = '';
    switch (category) {
      case '/in_theaters':
        navigationBarTitle = '正在热映';
        break;
      case '/coming_soon':
        navigationBarTitle = '即将上映';
        break;
      case '/top250':
        navigationBarTitle = 'top250';
        break;
    }
    this.setData({
      requestUrl: moviesUrl,
      navigationBarTitle: navigationBarTitle
    });
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle
    });
    this.getMoviesList(moviesUrl, "", "get", "movies");
  },
  getMoviesList(url, data, method) {
    util.http(url, data, method, this.filterDoubanMovies);
  },
  // 上滑到底部，加载数据
  onReachBottom() {
    let pushUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(pushUrl, "", "get", this.filterDoubanMovies);
    wx.showNavigationBarLoading();
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("....");
    let refreshUrl = this.data.requestUrl;
    this.setData({
      movies: [],
      totalCount: 0
    });
    util.http(refreshUrl, "", "get", this.filterDoubanMovies);
    wx.showNavigationBarLoading();
  },
  filterDoubanMovies(data) {
    let moviesArray = this.data.movies;
    let count = this.data.totalCount;
    for (let subject of data.subjects) {
      let temp = {
        imgMedium: subject.images.medium,
        title: subject.title.substring(0, 6),
        id: subject.id,
        ratingAverage: subject.rating.average,
        stars: util.scoreToStarsArr(subject.rating.stars)
      }
      moviesArray.push(temp);
    }
    count += data.subjects.length;
    this.setData({
      movies: moviesArray,
      totalCount: count
    });
    wx.hideNavigationBarLoading();
  }
})