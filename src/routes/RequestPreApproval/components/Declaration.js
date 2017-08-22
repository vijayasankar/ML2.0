import Col from 'react-bootstrap/lib/Col'
import DeclarationField from 'components/DeclarationField'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import { reduxForm } from 'redux-form'

export class RequestPreApprovalDeclaration extends React.Component {
  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-title`}>Declaration</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12}>
                <div className={`${this.props.cssName}-text`}>
                  <p>{`I agree with the `}
                    <a href='https://www.nibfirstchoice.co.nz/terms-and-conditions' className={`${this.props.cssName}-link`} target='_blank'>terms and conditions</a>
                    {` of use of the Portal and
                    I confirm that I have told you everything the Provider knows (or ought to know)
                    which would influence the decision of a prudent insurer whether to
                    accept this pre-approval, and if so, on what terms.`}</p>
                  <p>{`I confirm that the information I am providing in
                      relation to this claim payment request is:`}</p>
                  <ul>
                    <li>{`true, current, complete and accurate and includes all
                        relevant information about the applicable patient and the claim;`}</li>
                    <li>{`being submitting with the prior express authorisation of the applicable patient and that
                        nib has permission to contact the applicable patient to
                        verify the information and to discuss it; and`}</li>
                    <li>{` being submitting on the applicable Provider’s behalf with such Providers authorisation and
                        confirmation that the procedure and all other health services and items the subject of the
                        claim have all been completed or provided (as applicable).`}</li>
                  </ul>
                  <p>
                    Please read the {' '}
                    <a href='https://www.nibfirstchoice.co.nz/privacy-policy' className={`${this.props.cssName}-link`} target='_blank'>privacy policy</a>
                    {' '}
                    that applies to your claim.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <DeclarationField
                  cssName={`${this.props.cssName}-agree`}
                  fieldName='declarationAgree'
                  name='declaration-agree'
                  value='Yes'>
                  I have read and agree to the terms in the {' '}
                  <strong>declaration</strong>
                  {' '}
                  above.
                </DeclarationField>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

RequestPreApprovalDeclaration.propTypes = {
  cssName: React.PropTypes.string
}

RequestPreApprovalDeclaration.defaultProps = {}

export default reduxForm({ form: 'requestPreApproval' })(RequestPreApprovalDeclaration)
