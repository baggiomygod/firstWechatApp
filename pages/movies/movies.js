var app = getApp();
import util from '../../util/util.js';
Page({
    data: {
        hotMovies: {},
        comingSoon: {},
        top250: {}
    },
    onLoad() {
        let doubanMovieBaseUrl = app.globalData.doubanBaseUrl + '/v2/movie';
        let hotMoviesUrl = doubanMovieBaseUrl + '/in_theaters' + '?start=0&count=3';
        let comingSoonUrl = doubanMovieBaseUrl + '/coming_soon' + '?start=0&count=3';
        let top250Url = doubanMovieBaseUrl + '/top250' + '?start=0&count=3';
        this.getMoviesDataList(hotMoviesUrl, "", "get", 'hotMovies', '正在热映');
        this.getMoviesDataList(comingSoonUrl, "", "get", 'comingSoon', '即将上映');
        this.getMoviesDataList(top250Url, "", "get", 'top250', 'top250');
    },
    getMoviesDataList(url, data, method, settedKey, categoryTitle) {
        let that = this;
        wx.request({
            url: url,
            data: data,
            header: {
                "Content-Type": "json"
            },
            method: method,
            success(res) {
                that.filterDoubanMovies(res.data, settedKey, categoryTitle);
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    filterDoubanMovies(data, settedKey, categoryTitle) {
        let moviesArray = []
        for (let subject of data.subjects) {
            let starArr=[];

            let temp = {
                imgMedium: subject.images.medium,
                title: subject.title.substring(0, 6),
                id: subject.id,
                ratingAverage: subject.rating.average,
                stars: util.scoreToStarsArr(subject.rating.stars)
            };
            
            moviesArray.push(temp);
        }
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
            movies: moviesArray
        };
        this.setData(readyData);
    },
    onReady(){
        console.log("ready");
        console.log(this.data);
    },
    onShow(){
        console.log('show');
        console.log(this.data);
    }
});