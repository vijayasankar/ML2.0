import AttachDocumentField from 'components/AttachDocumentField'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import { reduxForm } from 'redux-form'

export class AttachDocuments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadProgress: -1,
      fileInput: {},
      currentRequest: {}
    }
  }

  render () {
    const {
      cssName,
      docBundle
    } = this.props
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-title`}>
              Attach documents
            </h3>
          </Col>
          <Col xs={12} md={9}>
            <AttachDocumentField
              cssName={cssName}
              docBundle={docBundle}
              documentType='SurgicalNotes'
              labelText='Surgical notes'
              maxAllowed={1}
              {...this.props}
            />
            <hr className='line-item' />
            <AttachDocumentField
              cssName={cssName}
              docBundle={docBundle}
              documentType='Unspecified'
              labelText='Other supporting documents'
              {...this.props}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

AttachDocuments.propTypes = {
  cssName: React.PropTypes.string,
  docBundle: React.PropTypes.object
}

AttachDocuments.defaultProps = {
  // cssName: 'attachDocuments'
}

const AttachDocumentsReduxForm = reduxForm({
  form: 'requestPayment'
})(AttachDocuments)

export default AttachDocumentsReduxForm
