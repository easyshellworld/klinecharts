"use client"
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { getwebData } from '../commipt/api'
import { useSearchParams } from 'next/navigation'



export const ChartComponent = props => {
	const {
		data,
		data2,
		colors: {
			backgroundColor = 'black',
			lineColor = '#2962FF',
			textColor = 'white',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();
	const timeScaleRef = useRef(null);

	useEffect(
		() => {
			const handleResize = () => {
				klinechart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const klinechart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			//	timeScale: timeScaleRef.current, 
			});

			const volumchart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 150,
			//	timeScale: timeScaleRef.current, 
				//visible:false,
			});
			
			//klinechart.timeVisible(false)
		//	klinechart.timeScale().fitContent();
		//	volumchart.timeScale().fitContent();
			const areaSeries = volumchart.addHistogramSeries({
				lineColor: '#2962FF', topColor: '#2962FF',
				bottomColor: 'rgba(41, 98, 255, 0.28)',
			});
			areaSeries.setData(data2);

			const newSeries = klinechart.addCandlestickSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });

			newSeries.setData(data);
			//volumchart.timeScale().scrollToPosition =klinechart.timeScale().scrollPosition
			//timeScaleRef.current.scrollToPosition = klinechart.timeScale().scrollToPosition;

		 // 添加滚动事件监听器，将一个图表的滚动应用到另一个图表
		
			
			  window.addEventListener('resize', handleResize);

			return () => {
				
				window.removeEventListener('resize', handleResize);
			//	timeScaleRef.current = klinechart.timeScale().scrollToPosition;
				klinechart.remove();
				volumchart.remove();
			};
		},
		[data, data2, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};


export function getklinevelue(kline) {
	return kline.map(a => {
		if (a.open > a.close) {
			return { time: a.time, value: a.volumefrom, color: 'red' }
		}
		else {
			return { time: a.time, value: a.volumefrom }
		}
	});
}


export default function Charts(props) {
	//const search = useSearchParams().get('coin')
	const geturldata = {
		coin: useSearchParams().get('coin'),
		day: useSearchParams().get('day')
	}
	const [newdata, setnewdata] = useState([
	])
	const [newdata2, setnewdata2] = useState([
	])
	const [stoploding, setstoploding] = useState(false)
	useEffect(()=>{
 		//if(stoploding== true){
			const interval=setInterval(()=>{setstoploding(false)},30000)
		  return ()=>clearInterval(interval);
		//}
	},[])
	if (stoploding == false) {
		let today = new Date().getTime()

		let last = Math.floor(today / 1000)
		getwebData({url:'/currency/kline?com_id=' + geturldata.coin + '_usdt&symbol=' + geturldata.coin + '&anchor=USDT&time=' + last + '&market_id=338&period=' + geturldata.day + '&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD'})
			.then(data => {
				// console.log(data.data.kline)
				const data_json = data.data.data.kline.reverse()
				let klinedata = {
					kline: data_json,
					value: getklinevelue(data_json)
				}

				//console.log(JSON.stringify(klinedata))
				setnewdata(klinedata.kline)
				setnewdata2(klinedata.value)
				setstoploding(true)
				// console.log(newdata)
				// 逻辑处理
			}
			,err => {
				return console.log(err);
			})
	}

	return (
		<><div className='grid grid-cols-0 gap-3 place-content-center text-9xl'>{geturldata.coin}</div>
			<div className=''>
				<div className=''>
					<ChartComponent {...props} data={newdata} data2={newdata2}></ChartComponent>
				</div>
			</div></>
	);
}
