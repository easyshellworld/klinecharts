'use client'
import { Getdatatable } from './commipt/getdatatable'
import { getlittledata, gettoday, getATR,getwebData } from './commipt/api'
import {   useState,useEffect } from 'react';



export default function Home() {
 const [coindatas,setCoindats]=useState([]);
 let coindatas1={}

  const [loading,setloading]=useState(true)
  

  const coinnames=['btc', 'eth', 'matic665', 'apt530', 'tron', 'solana', 'arb248','ape613']
  
  useEffect(()=>{
    if(loading===true){
      const num=coinnames.length
      let count=0;
      for (let i = 0; i < num; i++) {
        coindatas1[coinnames[i]]={}
       
        getwebData({url:gettoday(coinnames[i])})
          .then(data => {
            //console.log(data.data)
            const getdata = getlittledata(data.data.data.kline);
            const atrdata = getATR(getdata);
            coindatas1[coinnames[i]]= {
              name: coinnames[i].match(/.*[a-zA-Z]/),
              atr: atrdata,//getATR(getdata),
              kdata: getdata
            }
            count++;
           if(count>=num){
            // console.log(coindatas1)
            setCoindats(coindatas1)
            setloading(false);
           }
        
          }
          ,err => {
            return console.log(err);
          })
    
      }
    }

    
 })

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
