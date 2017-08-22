import * as actions from 'modules/actions'
import { mapDispatchToProps, mapStateToProps } from 'routes/UserManagement/container'

describe('(Route) Payments container', () => {
  let initialState
  let initialProp

  beforeEach(() => {
    initialState = {
      myProviders: {
        currentProviderDetails: {
          links: [],
          name: ''
        }
      },
      userManagement: {
        listOfInvitedUsers: [],
        listOfUsers: []
      },
      oidc: {
        user: {}
      }
    }

    initialProp = {
      currentProviderLinks: [],
      currentProviderName: '',
      listOfInvitedUsers: [],
      listOfUsers: [],
      token: ''
    }
  })

  it('loads action dispatchers to props', () => {
    expect(Object.keys(mapDispatchToProps)).to.deep.equal([
      'formReset',
      'formSubmit',
      'formSubmitError',
      'formSubmitSuccess',
      'loadUserManagementRegisteredUsersList'
    ])
  })

  it('loads Redux state to props currentProviderName', () => {
    const state = {
      ...initialState
    }
    state.myProviders.currentProviderDetails.name = 'aaa'
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      currentProviderName: 'aaa'
    })
  })

  it('loads Redux state to props currentProviderLinks', () => {
    const state = {
      ...initialState
    }
    state.myProviders.currentProviderDetails.links = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      currentProviderLinks: ['aaa']
    })
  })

  it('loads Redux state to props listOfUsers', () => {
    const state = {
      ...initialState
    }
    state.userManagement.listOfUsers = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      listOfUsers: ['aaa']
    })
  })

  it('loads Redux state to props list', () => {
    const state = {
      ...initialState
    }
    state.userManagement.listOfInvitedUsers = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      listOfInvitedUsers: ['aaa']
    })
  })
})
