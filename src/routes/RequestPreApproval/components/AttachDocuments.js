import AttachDocumentField from 'components/AttachDocumentField'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import { reduxForm } from 'redux-form'

export class AttachDocuments extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     uploadProgress: -1,
  //     fileInput: {},
  //     currentRequest: {}
  //   }
  // }

  render () {
    const {
      cssName,
      docBundle,
      isAccRelated
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
            { isAccRelated &&
              <div>
                <AttachDocumentField
                  cssName={cssName}
                  docBundle={docBundle}
                  documentType='AccLetter'
                  labelText='ACC decision letter'
                  maxAllowed={1}
                  {...this.props}
                />
                <hr className='line-item' />
              </div>
            }
            <AttachDocumentField
              cssName={cssName}
              docBundle={docBundle}
              documentType='ReferralLetter'
              labelText='Referral letter'
              maxAllowed={1}
              {...this.props}
            />
            <hr className='line-item' />
            <AttachDocumentField
              cssName={cssName}
              docBundle={docBundle}
              documentType='SpecialistReport'
              labelText='Specialist report'
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
  docBundle: React.PropTypes.object,
  isAccRelated: React.PropTypes.bool
}

AttachDocuments.defaultProps = {
  // cssName: 'attachDocuments'
}

const AttachDocumentsReduxForm = reduxForm({
  form: 'requestPreApproval'
})(AttachDocuments)

export default AttachDocumentsReduxForm
