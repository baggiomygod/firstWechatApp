function scoreToStarsArr(score){
    let num=score.toString().substring(0,1);
    let num2=score.toString().substring(1,2);
    let arr=[];
    for(let i=1;i<=5;i++){
        if(i<=num){
            arr.push(1);
        }else{
            arr.push(0);
        }
    }
    return arr;

}
function http(url,data,method,callback){
      wx.request({
            url: url,
            data: data,
            header: {
                "Content-Type": "json"
            },
            method: method,
            success(res) {
               callback(res.data);
            },
            fail(err) {
                console.log(err);
            }
        });
}
module.exports={
   scoreToStarsArr:scoreToStarsArr,
   http:http
}