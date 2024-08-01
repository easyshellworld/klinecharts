"use client"
import axios from "axios"

export const getwebData=axios.create({
    method: 'get',
   // url: gettoday(coinnames[i]),
    headers: {
      'Content-Type': 'application/json',
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0",
    }
 })

export const gettoday=(coinname)=>{

    let today=new Date().getTime()
    //today=Math.floor(today/1000)
    let last=Math.floor(today/1000)
    if( coinname=='vara391' ){
  
      return "/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=1333&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
      
    }else if(coinname=='ton309' ){
          return "/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=1324&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
    }
    
     else{
     return "/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
   }
}

export const getlittledata=(klinedata)=>{
    let arr=[]
    for(let i=0;i<9;i++){
        let newdatajosn={
          time:timestampToTime(klinedata[i].time),
          open:klinedata[i].open,
          high:klinedata[i].high,
          low:klinedata[i].low,
          close:klinedata[i]['close'],
          volumefrom:klinedata[i]['volumefrom'],
          colors:'green-300'         
        }
      
        if(newdatajosn['open'] > newdatajosn['close']){
          newdatajosn.colors='red-300'
        }
        arr.push(newdatajosn)
    }
    
    return arr
}

export const getATR=(klinedata)=>{
    let str=''
    let sumatr=0
    for(let i=0;i<klinedata.length-1;i++){
        let atr=keepThreeNum(Math.max(klinedata[i].high,klinedata[i+1].close)-Math.min(klinedata[i].low,klinedata[i].close))
        if(i===0){
            str+='today:'+atr
        }else if(i===1){
            str+=' ATR:'+atr
            sumatr+=parseFloat(atr)
        }else{
       // console.log(atr)
        sumatr+=parseFloat(atr)
        }
    }
    sumatr=sumatr/7
    return str + " ATR7:"+ sumatr
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    //var D = date.getDate() + ' ';
   /*  var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds(); */
  //  Log(Y+M+D)
    return Y+M+D;
}


 // 保留三位小数
function keepThreeNum(value) {
    let resValue = 0
    //小数点的位置
    let index = value&&value.toString().indexOf('.') + 1  
    //小数的位数 
    let num = value&&Math.abs(Number(value)).toString().length - index 
    if(index && num > 3){
      resValue = value&&Number(value).toFixed(3)
    } else {
      resValue = value
    }
    return resValue
  }
