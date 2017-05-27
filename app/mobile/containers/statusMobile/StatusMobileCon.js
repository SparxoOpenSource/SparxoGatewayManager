import { connect } from "react-redux"
import StatusMobile from '../../components/statusMobile/StatusMobile'
import { getGatewayStatus, toggleGatewayStatus } from "../../../actions/gateway"

const mapStateToProps = (state, ownProps) => ({
    statusInfo: state.status.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getGatewayStatus:()=>{
        dispatch(getGatewayStatus())
    },

    toggleGatewayStatus: ()=>{
        dispatch(toggleGatewayStatus())
    }
})

const StatusMobileCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusMobile)

export default StatusMobileCon