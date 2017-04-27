let initialState = {
    is_login: false
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOGIN_STATUS_SUCCESS":
            var loginStatus = action.payload.data;
            return Object.assign({}, state, {
                is_login: loginStatus
            })

        default:
            return state
    }
}

export default login