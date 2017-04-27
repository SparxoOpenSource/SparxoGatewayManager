import { connect } from "react-redux"
import Nav from '../components/Nav'


const mapStateToProps = (state, ownProps) => ({
    is_login: state.login.is_login
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const NavCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default NavCon