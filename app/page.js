'use client'
import { Getdatatable } from './commipt/getdatatable'
import { getlittledata, gettoday, getATR,getwebData } from './commipt/api'
import {   useState,useEffect } from 'react';



export default function Home() {
 const [coindatas,setCoindats]=useState([]);
 

  const [loading,setloading]=useState(true)

const getcoinarr=async ()=>{
  const coinnames=['BTC', 'BCH','ETH', 'matic665', 'apt530', 'tron', 'solana', 'UNI226','XLM','arb248','ape613']
  const coinPromises=coinnames.map((coinname)=>{
   return getwebData({url:gettoday(coinname)})
    .then(data => {
      const getdata = getlittledata(data.data.data.kline);
      const atrdata = getATR(getdata);
      const newname=coinname.match(/.*[a-zA-Z]/)
      const coinprice= {
        name: newname[0],
        atr: atrdata,
        kdata: getdata
      }
       return coinprice
    }
    ,err => {
      return  console.log(err);
    })

  })
  return Promise.all(coinPromises).then((coinPrices) => {
    return coinPrices; 
});

}
  

  
useEffect(()=>{
  if(loading===true){
  (async ()=>{

      const coindata =await getcoinarr()    
      setCoindats(coindata)
      setloading(false) 
  })()
}
  
},[loading])
      
  

    if (loading===true) return <div className='grid grid-cols-0 gap-8 place-content-center text-6xl h-full min-h-screen'>Loading...</div>
       
    return (
      <div className='grid grid-cols-0 gap-8 place-content-center'>
        <div>
          {Object.keys(coindatas).map(key => (
            <div key={key}>
              <Getdatatable coin={coindatas[key]} />
            </div>
          ))}
  
        </div>
        <div> <button className="btn btn-success">start</button></div>
      </div>
  
    )
  
}
