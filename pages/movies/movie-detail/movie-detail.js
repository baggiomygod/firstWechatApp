// pages/movies/movies-detail/movies-detail.js
// import util from '../../../util/util.js';
import {Movie} from 'class/Movie.js';
var app = getApp();
Page({
  data: {
    movieDetail: {},
    average: 0,
    stars: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let doubanMovieBaseUrl = app.globalData.doubanBaseUrl + '/v2/movie/';
    let movieUrl = doubanMovieBaseUrl + 'subject/' + options.movieId;
    // util.http(movieUrl, "", "get", this.filterDetilData);
    // 使用类方法的写法
    let movie =new Movie(movieUrl);
    movie.getMovieData((movieHub)=>{
      this.setData(movieHub);
    });
  }
  //es5
  // filterDetilData(data) {
  //   let average = data.rating.average;
  //   let stars = util.scoreToStarsArr(data.rating.stars);
  //   console.log(data);
  //   this.setData({
  //     movieDetail: data,
  //     average: average,
  //     stars: stars
  //   });
  // }
})