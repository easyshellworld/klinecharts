'use client'
import { Getdatatable } from './commipt/getdata'
import { getlittledata, gettoday, getATR } from './commipt/api'
import {   useState } from 'react';

async function getcoindata(coinname) {
  const coinurl = gettoday(coinname)
  const res = await fetch(coinurl, { next: { tags: ['collection'] } });
  const data = await res.json();




  return coindata;
}

export default function Home() {
 const [coindatas,setCoindats]=useState([]);
 let coindatas1=[]

  const [coinnames,setcoinnames]=useState(['btc', 'eth', 'matic665', 'apt530', 'tron', 'solana', 'ape613'])


    

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
  






  /*  */


  /*   useEffect(() => {
      // Update the document title using the browser API
      const coindata=getcoindata('btc')
    });
   */

  return (
    <div className='grid grid-cols-0 gap-8 place-content-center'>
      <div>
        {coindatas.map(coindata => (
          <div key={coindata.name}>
            <Getdatatable coin={coindata} />
          </div>
        ))}

      </div>
      <div>   <button className="btn btn-success"
      /*      onClick={async function() {
                  
               
                  // setcoindatas(arr)
                //   console.log(coindata)
     
                }} */
      >start</button></div>
    </div>

  )
}
