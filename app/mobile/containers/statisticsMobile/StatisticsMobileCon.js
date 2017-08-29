import { connect } from "react-redux"
import StatisticsMobile from '../../components/statisticsMobile/StatisticsMobile'
import { loadStat } from "../../../actions/statistics"

const mapStateToProps = (state, ownProps) => ({
    items : exitFilter(state.statistics.countOfDay),
    is_loading: state.loadingState.is_loading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadStat: (params)=>{
        dispatch(loadStat(params))
    }
})

const StatisticsMobileCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatisticsMobile)

export default StatisticsMobileCon

const exitFilter = (items) => {
    return items.filter(item=>{return item.Count != 0})
}