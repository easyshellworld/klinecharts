import Link from "next/link";
import { useState} from "react";

export const Changeurl=()=>{
    const [coinname,setCoinname]=useState('')
    const [timename,setTimename]=useState('')

   

    return(
        <div className="flex justify-between">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={coinname} onChange={e=>{setCoinname(e.target.value)}}/>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={timename} onChange={e=>{setTimename(e.target.value)}}/>
            <Link className="btn btn-succes" href={`/charts?coin=${coinname}&day=${timename}`}>change</Link>
        </div>
    )
}