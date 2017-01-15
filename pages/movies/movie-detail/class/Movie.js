import util from '../../../../util/util.js';
class Movie {
    // 构造函数
    constructor(url) {
        this.url = url;
    }
    getMovieData(callback) {
        this.callback = callback;
        util.http(this.url, "", "get", this.filterDetilData.bind(this));
        // bind(this),将filterDetilData上下文环境保定到Movie实例对象的this环境
    }
    filterDetilData(data) {
        if (!data) {
            return;
        }
        let average = data.rating.average;
        let stars = util.scoreToStarsArr(data.rating.stars);
        let movieHub={
            movieDetail: data,
            average: average,
            stars: stars
        };
        // console.log(this);// 如果上面不用bind(this),这里输出undefined;bind（this）后输出Movie
        this.callback(movieHub);
        
    }
    
}
export {
    Movie
}