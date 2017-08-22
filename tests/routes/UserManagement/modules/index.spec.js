import * as actions from 'modules/actions'
import reducer from 'routes/UserManagement/modules'

describe('(Module) UserManagement', () => {
  it('Reducer should be a function', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) UserManagement - state', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      isFetching: false,
      listOfInvitedUsers: [],
      listOfUsers: []
    }
  })

  it('should have an initial state', () => {
    const action = {}
    const result = reducer(undefined, action)
    expect(result).to.deep.equal(initialState)
  })

  it('should handle LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST action and sets isFetching', () => {
    const action = actions.loadUserManagementRegisteredUsersList()
    const prevState = { ...initialState }
    const nextState = { ...prevState, isFetching: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS action and sets isFetching', () => {
    const action = actions.loadUserManagementRegisteredUsersListSuccess(
      [],
      []
    )
    const prevState = { ...initialState, isFetching: true }
    const nextState = { ...prevState, isFetching: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS action and sets listOfUsers', () => {
    const action = actions.loadUserManagementRegisteredUsersListSuccess(
      ['aaa'],
      []
    )
    const prevState = { ...initialState }
    const nextState = { ...prevState, listOfUsers: ['aaa'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS action and sets listOfInvitedUsers', () => {
    const action = actions.loadUserManagementRegisteredUsersListSuccess(
      [],
      ['aaa']
    )
    const prevState = { ...initialState }
    const nextState = { ...prevState, listOfInvitedUsers: ['aaa'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
