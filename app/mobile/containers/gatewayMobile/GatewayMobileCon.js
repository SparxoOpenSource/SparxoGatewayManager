import { connect } from "react-redux"
import GatewayMobile from '../../components/gatewayMobile/GatewayMobile'
import { getEvents, getEventDetail } from "../../../actions/gateway"

const mapStateToProps = (state, ownProps) => ({
    eventsIdList: state.gateway.eventsList,
    eventDetails: state.gateway.eventDetails,
    is_loading: state.loadingState.is_loading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getEvents: (params) => {
        dispatch(getEvents(params))
    },

    getEventDetail: (params) => {
        dispatch(getEventDetail(params))
    }
})

const GatewayMobileCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(GatewayMobile)

export default GatewayMobileCon