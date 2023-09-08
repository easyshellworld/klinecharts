'use client'
import { Getdatatable } from './commipt/getdata'
import { getlittledata, gettoday,getATR } from './commipt/api'
import { useState } from 'react';

async function getcoindata(coinname) {
  const coinurl = gettoday(coinname)
  const res = await fetch(coinurl);
  const data = await res.json();
  const getdata = getlittledata(data.data.kline);
  const atrdata = getATR(getdata);

  const coindata = {
    name:coinname,
    atr: atrdata,//getATR(getdata),
    kdata: getdata
  }

  return coindata;
}

export default function Home() {

  const [coindatas,setcoindatas]=useState(
    [{
      name:'dont have data',
      atr: 'dont have data',//getATR(getdata),
      kdata: [{"time":1693785600,"open":0.54220000000000002,"high":0.55510000000000004,"low":0.54000000000000004,"close":0.55449999999999999,"volumefrom":43773100},{"time":1693699200,"open":0.54100000000000004,"high":0.54630000000000001,"low":0.53710000000000002,"close":0.54220000000000002,"volumefrom":17980300}]
    }]
  )
   
    /*  */


/*   useEffect(() => {
    // Update the document title using the browser API
    const coindata=getcoindata('btc')
  });
 */
    
  return (
   <div className='grid grid-cols-0 gap-8 place-content-center'>
    <div>
     {coindatas.map(coindata=>(
          <Getdatatable coin={coindata} /> 
     ))} 
      
    </div>
    <div>   <button className="btn btn-success"  
      onClick={async function() {
              const coinnames=['btc','eth','matic665','apt530','tron','solana','ape613']
              let arr=[];
              for(let i=0;i<coinnames.length;i++){
                const test=await getcoindata(coinnames[i])
                arr.push(test)
              }
          
              setcoindatas(arr)
           //   console.log(coindata)

           }}
           >start</button></div>
    </div>
    
  )
}
