import { connect } from 'react-redux'
import ModalLoading from './ModalLoading'

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const mapStateToProps = (state) => {
  return {
    currentProviderDetails: state.myProviders.currentProviderDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoading)
