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

module.exports={
   scoreToStarsArr:scoreToStarsArr 
}