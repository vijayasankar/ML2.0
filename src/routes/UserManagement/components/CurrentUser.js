import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import { reduxForm } from 'redux-form'

class CurrentUser extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Current user</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row className='pb-2'>
              <Col xs={12} md={3}>
                <span
                  className={`${this.props.cssName}-valid-title is-name`}
                >
                  Name
                </span>
              </Col>
              <Col xs={12} md={9}>
                <strong className={`${this.props.cssName}-valid-text is-name`}>
                  {`${this.props.name}`}
                </strong>
              </Col>
            </Row>
            <Row className='pb-2'>
              <Col xs={12} md={3}>
                <span className={`${this.props.cssName}-valid-title is-email`}>
                  Email address
                </span>
              </Col>
              <Col xs={12} md={9}>
                <strong className={`${this.props.cssName}-valid-text is-email`}>
                  {`${this.props.email}`}
                </strong>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

CurrentUser.propTypes = {
  cssName: React.PropTypes.string,
  email: React.PropTypes.string,
  name: React.PropTypes.string
}

export default CurrentUser
