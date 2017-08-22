import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import { reduxForm } from 'redux-form'

export class RegisteredUsers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registeredUsersList: [
        ...this.props.listOfUsers,
        ...this.props.listOfInvitedUsers
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      registeredUsersList: [
        ...nextProps.listOfUsers,
        ...nextProps.listOfInvitedUsers
      ]
    })
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Registered users</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row className={`${this.props.cssName}-row`}>
              <Col xs={3} md={4} className={`${this.props.cssName}-row-heading is-name`}>Name</Col>
              <Col xs={3} md={5} className={`${this.props.cssName}-row-heading is-email`}>Email address</Col>
              <Col xs={3} md={2} className={`${this.props.cssName}-row-heading is-role`}>Role</Col>
              {/* <Col xs={3} md={1} className={`${this.props.cssName}-row-heading is-delete`} /> */}
            </Row>
            {/* Repeating - Start */}
            {this.state.registeredUsersList.map((item, index) =>
              <Row key={index} className={`${this.props.cssName}-row is-user`}>
                <Col xs={3} md={4} className={`${this.props.cssName}-row-col is-name`}>{`${item.firstName || ''} ${item.lastName || ''}`.trim()}</Col>
                <Col xs={3} md={5} className={`${this.props.cssName}-row-col is-email`}>{item.email || ''}</Col>
                <Col xs={3} md={2} className={`${this.props.cssName}-row-col is-role`}>{item.roleName || ''}</Col>
                {/* <Col xs={3} md={1} className={`${this.props.cssName}-row-col is-delete`}> */}
                {/* </Col> */}
              </Row>
            )}
            {/* Repeating - End */}
          </Col>
        </Row>
      </div>
    )
  }
}

RegisteredUsers.propTypes = {
  cssName: React.PropTypes.string,
  listOfInvitedUsers: React.PropTypes.array,
  listOfUsers: React.PropTypes.array
}

RegisteredUsers.defaultProps = {
  cssName: 'user-management__registered-users'
}

const RegisteredUsersReduxForm = reduxForm({
  form: 'requestPayment'
})(RegisteredUsers)

export default RegisteredUsersReduxForm
