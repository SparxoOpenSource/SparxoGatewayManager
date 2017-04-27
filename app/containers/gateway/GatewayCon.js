import { connect } from "react-redux"
import Gateway from '../../components/gateway/Gateway'
import { getEvents, getEventDetail } from "../../actions/gateway"

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

const GatewayCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Gateway)

export default GatewayCon