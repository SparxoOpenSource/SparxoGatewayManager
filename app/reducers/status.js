let initialState = {
    data: {
        isOn: false,
        perf: []
    }
}

const status = (state = initialState, action) => {
    switch (action.type) {
        case "GET_GATEWAY_STATUS_SUCCESS":
            var info = action.payload.data;
            return Object.assign({}, state, {
                data: info
            })

        case "TOGGLE_STATUS_SUCCESS":
            return Object.assign({}, state, {
                data: {
                    isOn: !state.data.isOn
                }
            })

        default:
            return state
    }
}

export default status