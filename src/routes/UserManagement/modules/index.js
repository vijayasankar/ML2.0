import * as constants from 'modules/constants'

const initialState = {
  isFetching: false,
  listOfInvitedUsers: [],
  listOfUsers: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST:
      return {
        ...state,
        isFetching: true
      }
    case constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listOfUsers: action.payload.users,
        listOfInvitedUsers: action.payload.invitedUsers
      }
    default:
      return state
  }
}
