const range = x=>{
    const result = [];
    for(var i = 0;i<x;i++){
        result.push(i)
    }
    return result;
}

export const generateAbsent = (employeeCount,leaveDays,workDays)=>{
    const leavePlan = range(employeeCount).map(it=>{
        const result = []
        var days = leaveDays;
        while(days>0){
            const absentDay = Math.floor(Math.random()*workDays)
            if(!result.includes(absentDay)){
                result.push(absentDay)
                days--;
            }
        }
        return result
    })
    return range(workDays).map(it=>employeeCount - leavePlan.filter(k=>k.includes(it)).length)
}
export const distribute = (plan,w)=>{
    const min = Math.min(...plan)
    const max = Math.max(...plan)
    const list =range(max-min+1).map(it=>it+min);
    return list.map(it=>{
        const weight = plan.map(k=>k>=it?(k-it)*w:it-k).reduce((p,c)=>c+=p)
        return ({days:it,count:plan.filter(k=>k==it).length,weight,percent:it*100.0/plan.length})
    })
}

export const getBest = (distribution)=>{
    const weight = distribution.map(it=>it.weight)
    const best = Math.min(...weight)
    const index = weight.indexOf(best)
    return distribution.length==0?0:distribution[index].days
}