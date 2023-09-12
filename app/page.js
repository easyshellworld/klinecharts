'use client'
import { Getdatatable } from './commipt/getdatatable'
import { getlittledata, gettoday, getATR } from './commipt/api'
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
       
        fetch(gettoday(coinnames[i]))
          .then(res => res.json())
          .then(data => {
            // console.log(data.data.kline)
            const getdata = getlittledata(data.data.kline);
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
        
          })
          .catch(err => console.log(err))
    
      }
    }

    
 })

    if (loading===true) return <div className='grid grid-cols-0 gap-8 place-content-center text-6xl'>Loading...</div>
       
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
