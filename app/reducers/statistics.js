import moment from 'moment'

let initialState = {
    countOfDay: []
}

const loadStat = (state = initialState, action)=>{
    switch (action.type) {
        case "GET_STAT_SUCCESS":
            var info = action.payload.data;
            var bTime = action.payload.bTime;
            var eTime = action.payload.eTime;
            info = info.map(item=>{
                item.Date = moment(item.Date).format("YYYY-M-D")
                return item
            })
            var temp_arr = getTempData(info)
            var initial_arr = getInitialStat(bTime,eTime);
            var stats_arr = getStatsData(initial_arr,temp_arr)
            
            
            return Object.assign({},state,{
                countOfDay: stats_arr
            })
    
        default:
            return state
    }
}   

export default loadStat

const getTempData = (info) =>{
    var temp = {};
    var temp_arr = []
    for(var ar of info){
        var key= ar.Date;
        if(temp[key]){
            temp[key].Count += ar.Count;
        }else{
            temp[key] = ar;
        }
        if(!temp[key].Events){
            temp[key].Events=[{Id:ar.EventId,Count:ar.Count}];
        }else{
            temp[key].Events.push({Id:ar.EventId,Count:ar.Count})
        }
    }
    for(var key in temp){
        delete temp[key].EventId
        temp_arr.push(temp[key])
    }
    return temp_arr
}

const getInitialStat = (bTime,eTime) =>{
    
    var temp_arr = []
    while (moment(bTime).valueOf() <= moment(eTime).valueOf()) {
        var temp ={
            Date: bTime,
            Count: 0,
            Events:{
                Count: 0,
                Id: ''
            }
        }
        temp_arr.push(temp)
        bTime = moment(bTime).add(1,"days").format("YYYY-M-D")
    }
    return temp_arr
}

const getStatsData = (init,info)=>{
    var temp = []
    for(var i=0; i<init.length; i++){
        for(var j=0; j<info.length; j++){
            if(init[i].Date == info[j].Date){
                init[i].Count += info[j].Count
                init[i].Events = info[j].Events
            }
        }
    }
    return init
}