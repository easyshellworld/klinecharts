'use client'
import { Getdatatable } from './commipt/getdatatable'
import { getlittledata, gettoday, getATR } from './commipt/api'
import {   useState,useEffect } from 'react';



export default function Home() {
 const [coindatas,setCoindats]=useState([]);
 let coindatas1=[]

  const [coinnames,setcoinnames]=useState(['btc', 'eth', 'matic665', 'apt530', 'tron', 'solana', 'ape613'])

//  useEffect(()=>{
      for (let i = 0; i < coinnames.length; i++) {
        fetch(gettoday(coinnames[i]))
          .then(res => res.json())
          .then(data => {
            // console.log(data.data.kline)
            const getdata = getlittledata(data.data.kline);
            const atrdata = getATR(getdata);
            const coindatat = {
              name: coinnames[i],
              atr: atrdata,//getATR(getdata),
              kdata: getdata
            }
            coindatas1.push(coindatat)
           if(coindatas1.length>=7){
            setCoindats(coindatas1)
             setcoinnames([]);
           }
        
          })
          .catch(err => console.log(err))
    
      }

    

  //  })

    if (coinnames.length===7) return <div className='grid grid-cols-0 gap-3 place-content-center text-6xl'>Loading...</div>
       
    return (
      <div className='grid grid-cols-0 gap-8 place-content-center'>
        <div>
          {coindatas.map(coindata => (
            <div key={coindata.name}>
              <Getdatatable coin={coindata} />
            </div>
          ))}
  
        </div>
        <div> <button className="btn btn-success">start</button></div>
      </div>
  
    )
  
}
