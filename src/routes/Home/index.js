import { connect } from 'react-redux'
import HomeView from './components/HomeView'
import Header from 'components/Header'
import {
  loadHomeLists,
  loadPaymentsList,
  loadPreApprovalsList
} from 'modules/actions'

export const mapDispatchToProps = {
  loadHomeLists,
  loadPaymentsList,
  loadPreApprovalsList
}

export const mapStateToProps = (state) => {
  return {
    currentProvider: state.myProviders.currentProvider,
    currentProviderDetails: state.myProviders.currentProviderDetails,
    paymentsList: state.payments.list,
    preApprovalsList: state.preApprovals.list
  }
}

export default {
  components : {
    header: Header,
    main: connect(mapStateToProps, mapDispatchToProps)(HomeView)
  }
}
