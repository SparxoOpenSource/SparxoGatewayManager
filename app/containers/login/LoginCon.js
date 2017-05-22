import { connect } from "react-redux"
import Login from '../../components/login/Login'
import { login } from "../../actions/login"

const mapStateToProps = (state, ownProps) => ({
    is_login: state.login.is_login,
    token: state.login.token
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (data)=>{
        dispatch(login(data))
    }
})

const LoginCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginCon