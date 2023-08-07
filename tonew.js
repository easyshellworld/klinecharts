const fs=require('fs')

const olddata=fs.readFileSync('test.json','utf-8');

let datajson=JSON.parse(olddata);

let newdata=[]
for(let i=datajson.length-1;i>-1;i--){
/*     let arr={
        time:datajson[i].time,
        open:datajson[i].open,
        high:datajson[i].high,
        low: datajson[i].low,
    } */
    newdata.push(datajson[i])
}

let newtest=JSON.stringify(newdata)

fs.writeFile('new.json',newtest,err=>{
    if(!err){
        console.log('ok')
    }
    else{
        console.log(err)
    }
})

