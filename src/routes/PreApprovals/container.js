import { connect } from 'react-redux'
import PreApprovals from './components/index.js'
import { checkListPagingNext } from 'utils/helpers'
import {
  loadMorePreApprovalsList,
  loadPreApprovalsList
} from 'modules/actions'

export const mapDispatchToProps = {
  loadMorePreApprovalsList,
  loadPreApprovalsList
}

export const mapStateToProps = (state) => {
  const isListPagingNext = () => checkListPagingNext(state.preApprovals.links)
  console.log('PreApprovals:state', state)
  return ({
    currentProviderName: state.myProviders.currentProviderDetails.name,
    isFetching: state.preApprovals.isFetching,
    isListPagingNext: isListPagingNext(),
    links: state.preApprovals.links,
    list: state.preApprovals.list
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PreApprovals)
