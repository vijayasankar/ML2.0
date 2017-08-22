import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import Link from 'react-router/lib/Link'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'

class RequestPaymentSubmitted extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormReset = this.handleFormReset.bind(this)
  }

  handleFormReset (event) {
    this.props.formReset('requestPayment')
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={9} className='full-width'>
            <Row className='pb-2'>
              <Col xs={12} md={12}>
                <div className={`${this.props.cssName}-text`}>
                  <strong className={`${this.props.cssName}-text-heading`}>
                    Please monitor your dashboard for information about this payment request.
                  </strong>
                </div>
              </Col>
            </Row>
            <Row className='text-right'>
              <Col xs={12} md={12}>
                <Button
                  className={`${this.props.cssName}-trigger is-another btn primary-btn`}
                  onClick={this.handleFormReset}
                >
                  Request another payment
                </Button>
                <Link to='/providerportal/'
                  className={`${this.props.cssName}-trigger is-done btn primary-btn`}
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

RequestPaymentSubmitted.propTypes = {
  cssName: React.PropTypes.string,
  formReset: React.PropTypes.func
}

export default RequestPaymentSubmitted
