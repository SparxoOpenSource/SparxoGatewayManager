import { connect } from "react-redux"
import Status from '../../components/status/Status'
import { getGatewayStatus, toggleGatewayStatus } from "../../actions/gateway"

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

const StatusCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Status)

export default StatusCon