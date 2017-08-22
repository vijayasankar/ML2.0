import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import ProgressBar from 'react-bootstrap/lib/ProgressBar'

class ModalLoading extends React.Component {
  render () {
    const {
      currentProviderDetails
    } = this.props

    if (currentProviderDetails && currentProviderDetails.id) {
      return null
    } else {
      return (
        <Modal.Dialog className='modal__loading'>
          <Modal.Body>
            <span>Loading ...</span>
            <ProgressBar active bsStyle='success' now={100} />
          </Modal.Body>
        </Modal.Dialog>
      )
    }
  }
}

ModalLoading.propTypes = {
  currentProviderDetails: PropTypes.object
}

export default ModalLoading
