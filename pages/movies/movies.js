var app = getApp();
import util from '../../util/util.js';
Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        moviesArray: [],
        searchViewShow: false,
        searchMovies: {},
        searchKey: ""
    },
    onLoad() {
        wx.showNavigationBarLoading();
        let doubanMovieBaseUrl = app.globalData.doubanBaseUrl + '/v2/movie';
        let inTheatersUrl = doubanMovieBaseUrl + '/in_theaters' + '?start=0&count=3';
        let comingSoonUrl = doubanMovieBaseUrl + '/coming_soon' + '?start=0&count=3';
        let top250Url = doubanMovieBaseUrl + '/top250' + '?start=0&count=3';
        this.getMoviesDataList(inTheatersUrl, "", "get", 'inTheaters', '正在热映', '/in_theaters');
        this.getMoviesDataList(comingSoonUrl, "", "get", 'comingSoon', '即将上映', '/coming_soon');
        this.getMoviesDataList(top250Url, "", "get", 'top250', 'top250', '/top250');
    },
    getSearchData(e) {
        let searchKey = e.detail.value;
        let doubanMovieBaseUrl = app.globalData.doubanBaseUrl + '/v2/movie/search';
        let searchUrl = doubanMovieBaseUrl + "?q=" + searchKey;
        this.getMoviesDataList(searchUrl, "", "get", "searchMovies", "搜索结果");
        wx.showNavigationBarLoading();
    },
    getMoviesDataList(url, data, method, settedKey, categoryTitle, moreMoviesUrl) {
        let that = this;
        wx.request({
            url: url,
            data: data,
            header: {
                "Content-Type": "json"
            },
            method: method,
            success(res) {
                console.log(res);
                that.filterDoubanMovies(res.data, settedKey, categoryTitle, moreMoviesUrl);
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    filterDoubanMovies(data, settedKey, categoryTitle, moreMoviesUrl) {
        let moviesArray = [];
        for (let subject of data.subjects) {
            let temp = {
                imgMedium: subject.images.medium,
                title: subject.title.substring(0, 6),
                id: subject.id,
                ratingAverage: subject.rating.average,
                stars: util.scoreToStarsArr(subject.rating.stars)
            };

            moviesArray.push(temp);
        }
        this.setData({
            moviesArray: moviesArray
        });
        /*
         {Ï
            inTheaters: {},
            coingSoon: {},
            top250: {}
        }
        */
        let readyData = {};
        readyData[settedKey] = {
            categoryTitle: categoryTitle,
            movies: moviesArray,
            moreMoviesUrl: moreMoviesUrl
        };
        this.setData(readyData);
        wx.hideNavigationBarLoading();
    },
    openMareMvies(event) {
        wx.navigateTo({
            url: 'movies-grid/movies-grid?category=' + event.currentTarget.dataset.moviesType
        });
    },
    onBindFocus() {
        this.setData({
            searchViewShow: true
        })
    },
    hideSearchView(e) {
        console.log(e);
        this.setData({
            searchViewShow: false,
            searchKey: "",
            searchMovies: {}
        });
        wx.hideKeyboard();
    },
    gotoDetail(e) {
        let movieId = e.currentTarget.dataset.movieId;
        let movieName = e.currentTarget.dataset.movieName;
        wx.navigateTo({
          url: 'movie-detail/movie-detail?movieId='+movieId+'&name='+movieName
        })
    }
});