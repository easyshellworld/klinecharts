/* 
export const getBolldata=(kline)=>{
    let bolldata=[]
    for(let i=14;i<kline.length;i++){
        const  getsolebolldata=getsoleboll(kline,i)
        const  testbolldata={
            time:kline[i].time,
            UP:getsolebolldata,
            MB:getsolebolldata,
            DN:getsolebolldata,

        }
        bolldata.push(testbolldata)
    }
    return bolldata
}

const getsoleboll=(kline,i)=>{
    let sum=0;
    for(let j=i;j>i-14;i--){
        sum+=Kite[j].close
    }
    return sum/14
} */

export function getboll(kline, period, stdMultiplier) {
    if (kline.length < period) {
        // 如果kline数组长度小于周期，则不进行计算
        return [];
    }

    const sma = (data) => {
        return data.reduce((sum, val) => sum + val, 0) / data.length;
    };

    const stdDev = (data, mean) => {
        const squareDiffs = data.map(value => {
            const diff = value - mean;
            return diff * diff;
        });
        return Math.sqrt(squareDiffs.reduce((sum, val) => sum + val, 0) / data.length);
    };

    let bollData = [];

    for (let i = period - 1; i < kline.length; i++) {
        const periodData = kline.slice(i - period + 1, i + 1);
        const closingPrices = periodData.map(p => p.close);
        const mean = sma(closingPrices);
        const stdDeviation = stdDev(closingPrices, mean);

        const upperBand = mean + (stdMultiplier * stdDeviation);
        const lowerBand = mean - (stdMultiplier * stdDeviation);
        const time = periodData[periodData.length - 1].time; // 取周期内最后一条数据的时间

        bollData.push({
            time: time,
            middleBand: mean,
            upperBand: upperBand,
            lowerBand: lowerBand
        });
    }

    return bollData;
}

export const threeboll=(kline)=>{
    const bolldata=getboll(kline,14,3);
    let threebolldata={
        md:[],
        up:[],
        dn:[]

    }
    for(let i=0;i<bolldata.length;i++){
        threebolldata.md.push({
            time:bolldata[i].time,
            value:bolldata[i].middleBand
        })
        threebolldata.up.push({
            time:bolldata[i].time,
            value:bolldata[i].upperBand
        })
        threebolldata.dn.push({
            time:bolldata[i].time,
            value:bolldata[i].lowerBand
        }

        )            
    
    }

   // console.log(threebolldata)
    return threebolldata
}