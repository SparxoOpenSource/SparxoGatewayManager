let initialState = {
    eventsList: [
    ],
    eventDetails: {
    },
    statusInfo: {
        isOn: false,
        perf: []
    }
}

const gateway = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EVENTS_SUCCESS":
            var info = action.payload.data
            var temp_info = []
            for (var i = 0; i < info.length; i++) {
                var temp_item = {
                    eventId: '',
                    inService: 0,
                    success: 0,
                    fail: 0
                }
                temp_item.eventId = info[i].EventId
                if (info[i].ResponseCode == 200) {
                    temp_item.success = info[i].Count
                }
                if (info[i].ResponseCode == 0) {
                    temp_item.inService = info[i].Count
                }
                if (info[i].ResponseCode != 0 && info[i].ResponseCode != 200) {
                    temp_item.fail = info[i].Count
                }
                temp_info.push(temp_item)

            }
            for (var i = 0; i < temp_info.length; i++) {
                for (var j = i + 1; j < temp_info.length; j++) {

                    if (temp_info[i].eventId == temp_info[j].eventId) {
                        if (temp_info[i].inService == 0) {
                            temp_info[i].inService = temp_info[j].inService
                        }
                        if (temp_info[i].success == 0) {
                            temp_info[i].success = temp_info[j].success
                        }
                        if (temp_info[i].fail == 0) {
                            temp_info[i].fail = temp_info[j].fail
                        }
                        temp_info.splice(j, 1)
                    }
                }
            }

            console.log(temp_info)
            return Object.assign({}, state, {
                eventsList: temp_info
            })


        case "GET_EVENT_DETAIL_SUCCESS":
            var info = action.payload.data
            return Object.assign({},state,{
                eventDetails: {
                    [action.payload.id]: info
                }
            });

        default:
            return state
    }
}

export default gateway



