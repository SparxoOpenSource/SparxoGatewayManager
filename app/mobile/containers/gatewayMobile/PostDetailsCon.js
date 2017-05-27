import { connect } from "react-redux"
import PostDetails from '../../components/gatewayMobile/PostDetails'


const mapStateToProps = (state, ownProps) => ({
    eventDetails: state.gateway.eventDetails,
    pathname: ownProps.location.pathname
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const PostDetailsCon = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)

export default PostDetailsCon