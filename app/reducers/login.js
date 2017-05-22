let initialState = {
    is_login: false,
    token: null
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOGIN_STATUS_SUCCESS":
            var loginStatus = action.payload.is_login;
            var _token = action.payload.data
            return Object.assign({}, state, {
                is_login: loginStatus,
                token: _token
            })

        default:
            return state
    }
}

export default login