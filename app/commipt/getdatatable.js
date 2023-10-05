

export const Getdatatable=(props)=> {
    const {coin}=props;
    return (
       <div className="grid grid-cols-0 gap-3 place-content-center ">
        <div className="grid grid-cols-0 gap-8 place-content-center text-5xl">{ coin.name }</div>
        <div>{coin.atr}</div>
        <table className="border-solid border-2 border-green-600 ...">
       
        <thead className="border-solid border-2 border-green-600 ...">
          <tr>
            <th className="border-solid border-2 border-green-600 bg-blue-400 ...">time</th>
            <th className="border-solid border-2 border-green-600 bg-green-300 ...">open</th>
            <th className="border-solid border-2 border-green-600 bg-green-500 ...">high</th>
            <th className="border-solid border-2 border-green-600 bg-red-500 ...">low</th>
            <th className="border-solid border-2 border-green-600 bg-red-300 ...">close</th>
            <th className="border-solid border-2 border-green-600 bg-blue-400 ...">volume</th>
          </tr>
        </thead>
        <tbody>
          {coin.kdata.map((item,index) => (
            <tr key={index}>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item.time}</td>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item.open}</td>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item.high}</td>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item.low}</td>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item['close']}</td>
           <td className={`border-solid border-2 border-green-600 bg-${item.colors} ...`}>{item['volumefrom']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
  

    )
  }
  