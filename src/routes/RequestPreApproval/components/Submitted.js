import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import Link from 'react-router/lib/Link'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'

class RequestPreApprovalSubmitted extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormReset = this.handleFormReset.bind(this)
  }

  handleFormReset (event) {
    this.props.formReset('requestPreApproval')
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={9} className='full-width'>
            <Row className='pb-2 container'>
              <Col xs={12} md={12}>
                <div className={`${this.props.cssName}-text`}>
                  <strong className={`${this.props.cssName}-text-heading`}>
                    If your procedure is taking place within 5 working days, please call our Claims Team on 0800 123 642
                  </strong>
                  <ul className={`${this.props.cssName}-list`}>
                    <li>
                      <p>
                        What to do next - when your request is approved, go ahead with the procedure.
                      </p>
                    </li>
                    <li>
                      <p>
                        We may need to contact you or your patient for additional information.
                      </p>
                    </li>
                    <li>
                      <p>
                        We will contact your patient when this pre-approval has been assessed.
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row className='text-right'>
              <Col xs={12} md={12}>
                <Button
                  className={`${this.props.cssName}-trigger is-another btn primary-btn`}
                  onClick={this.handleFormReset}
                >
                  Request another pre-approval
                </Button>
                <Link to='/providerportal/'
                  className={`${this.props.cssName}-trigger is-done btn primary-btn`}
                  onClick={this.handleDone}
                >
                  Done
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

RequestPreApprovalSubmitted.propTypes = {
  cssName: React.PropTypes.string,
  formReset: React.PropTypes.func
}

export default RequestPreApprovalSubmitted
