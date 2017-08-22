import { connect } from 'react-redux'
import Payments from './components/index.js'
import { checkListPagingNext } from 'utils/helpers'
import {
  loadMorePaymentsList,
  loadPaymentsList
} from 'modules/actions'

export const mapDispatchToProps = {
  loadMorePaymentsList,
  loadPaymentsList
}

export const mapStateToProps = (state) => {
  const isListPagingNext = () => checkListPagingNext(state.payments.links)
  return ({
    currentProviderName: state.myProviders.currentProviderDetails.name,
    isFetching: state.payments.isFetching,
    isListPagingNext: isListPagingNext(),
    links: state.payments.links,
    list: state.payments.list
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
