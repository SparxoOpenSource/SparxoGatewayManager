import { connect } from "react-redux"
import Statistics from '../../components/statistics/Statistics'
import { loadStat } from "../../actions/statistics"

const mapStateToProps = (state, ownProps) => ({
    items : state.statistics.countOfDay,
    is_loading: state.loadingState.is_loading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadStat: (params)=>{
        dispatch(loadStat(params))
    }
})

const StatisticsCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistics)

export default StatisticsCon