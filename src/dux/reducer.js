const initialState = {
  id: '',
  username: '',
  profile_pic: ''
}

const USER_TO_STORE = 'USER_TO_STORE'

export function userToStore(id, username, profile_pic) {
  return {
    type: USER_TO_STORE,
    payload: { id, username, profile_pic }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_TO_STORE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
