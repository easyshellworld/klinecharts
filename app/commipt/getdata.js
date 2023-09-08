

export const Getdatatable=(props)=> {
    const {coin}=props;
    return (
       <div className="grid grid-cols-0 gap-3 place-content-center ">
        <div className="grid grid-cols-0 gap-8 place-content-center text-5xl">{ coin.name }</div>
        <div>{coin.atr}</div>
        <table className="border-solid border-2 border-indigo-600 ...">
       
        <thead className="border-solid border-2 border-indigo-600 ...">
          <tr>
            <th>time</th>
            <th>open</th>
            <th>high</th>
            <th>low</th>
            <th>close</th>
            <th>volume</th>
          </tr>
        </thead>
        <tbody>
          {coin.kdata.map(item => (
            <tr>
               <td>{item.time}</td>
           <td>{item.open}</td>
           <td>{item.high}</td>
           <td>{item.low}</td>
           <td>{item['close']}</td>
           <td>{item['volumefrom']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
  

    )
  }
  