"use client"
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useState} from 'react';
import { useSearchParams } from 'next/navigation'



export const ChartComponent = props => {
	const {
		data,
		data2,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});

			const chart2 = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 150,
			});
			chart.timeScale().fitContent();
			chart2.timeScale().fitContent();
			const areaSeries = chart2.addHistogramSeries({
				lineColor: '#2962FF', topColor: '#2962FF',
				bottomColor: 'rgba(41, 98, 255, 0.28)',
			});
			areaSeries.setData(data2);

			const newSeries = chart.addCandlestickSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
				chart2.remove();
			};
		},
	    [data,data2, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};


export function getklinevelue(kline){
	return  kline.map(a => {
		if(a.open>a.close){
		 return	{time:a.time,value:a.volumefrom, color: 'red'}
		}
		else{
			return	{time:a.time,value:a.volumefrom}
		}
	});
}


export default function Charts(props) {
	//const search = useSearchParams().get('coin')
    const geturldata={
        coin: useSearchParams().get('coin'),
        day:useSearchParams().get('day')
    }
	const [newdata, setnewdata] = useState( [
		]) 
  const [newdata2, setnewdata2] = useState( [
		]) 
		let today=new Date().getTime()
		
		let last=Math.floor(today/1000)
	fetch('/currency/kline?com_id='+geturldata.coin+'_usdt&symbol='+geturldata.coin+'&anchor=USDT&time='+last+'&market_id=338&period='+geturldata.day+'&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD')
	.then( res=>res.json() ) 
	.then( data=>{
          // console.log(data.data.kline)
		 const data_json=data.data.kline.reverse()
		  let klinedata={
			kline:data_json,
			value:getklinevelue(data_json)
		}

		//console.log(JSON.stringify(klinedata))
	    setnewdata(klinedata.kline)
		setnewdata2(klinedata.value)
		// console.log(newdata)
           // 逻辑处理
        } )
	.catch( err=>console.log(err) )


	return (
		<><div className='grid grid-cols-0 gap-3 place-content-center text-9xl'>{geturldata.coin}</div>
		<div className='min-w-[1800px]  overflow-x-scroll'>
			<div className='flew-shrink-0' id='newchart'>
			<ChartComponent {...props} data={newdata} data2={newdata2}></ChartComponent>
			</div>
			</div></>
	);
}
