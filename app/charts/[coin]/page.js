"use client"
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useState} from 'react';


export const ChartComponent = props => {
	const {
		data,
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
			chart.timeScale().fitContent();

			const newSeries = chart.addCandlestickSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};




//const gettestdata=JSON.stringify(testdata)


export default function Page({ params },props) {
	
	const [newdata, setnewdata] = useState( [

	/* 	{"time":1670716800,"open":17127.5,"high":17271,"low":17071,"close":17085.1,"volumefrom":118634},{"time":1670803200,"open":17085.1,"high":17241.9,"low":16871.8,"close":17209.8,"volumefrom":175374},{"time":1670889600,"open":17208.9,"high":17969.9,"low":17080.1,"close":17774.7,"volumefrom":210604},{"time":1670976000,"open":17775.8,"high":18387.9,"low":17660.9,"close":17803.2,"volumefrom":209879},{"time":1671062400,"open":17804,"high":17854.8,"low":17275.5,"close":17356.3,"volumefrom":177189} */
		]) 
	
	/* const testdata=fetchData('/api-text')
	console.log(testdata.data) */
	fetch('/currency/kline?com_id='+params.coin+'_usdt&symbol='+params.coin+'&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD')
	.then( res=>res.json() ) 
	.then( data=>{
          // console.log(data.data.kline)
		 
	     setnewdata(data.data.kline.reverse())
		// console.log(newdata)
           // 逻辑处理
        } )
	.catch( err=>console.log(err) )


	return (
		<><h1>{params.coin}</h1><ChartComponent {...props} data={newdata}></ChartComponent></>
	);
}